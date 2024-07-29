package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.ListProductRequest;
import com.uade.tpo.demo.exceptions.ProductDuplicateException;
import com.uade.tpo.demo.exceptions.UserNotFoundException;
import com.uade.tpo.demo.repository.ProductRepository;
import com.uade.tpo.demo.repository.UserRepository;

import io.micrometer.common.util.StringUtils;

/*
 * Implementación de los servicios de productos.
 */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    /*
     * Obtiene todos los productos.
     * 
     * @return Lista de productos.
     */
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    /*
     * Obtiene todos últimos productos.
     * 
     * @return Lista de los últimos productos.
     */
    public List<Product> getLasts() {
        return productRepository.findLasts();
    }

    /*
     * Busca todos los productos que cumplan con las condiciones especificadas en el
     * request.
     * 
     * @param request: ListProductRequest con los filtros a aplicar.
     * 
     * @param pageable: PageRequest con la paginación a aplicar.
     * 
     * @return Lista de productos que cumplen con los filtros.
     */
    public Page<Product> listProducts(ListProductRequest request, PageRequest pageable) {
        Specification<Product> spec = Specification
                .where(specId(request.getId()))
                .and(specCategoryId(request.getCategoryId()))
                .and(specName(request.getName()))
                .and(specDescription(request.getDescription()))
                .and(specPriceFrom(request.getPriceFrom()))
                .and(specPriceTo(request.getPriceTo()))
                .and(specWithStock(request.getWithStock()));

        return productRepository.findAll(spec, pageable);
    }

    /*
     * Busca un producto por su id.
     * 
     * @param productId: Id del producto a buscar.
     * 
     * @return Producto encontrado.
     */
    public Optional<Product> getProductById(long productId) {
        return productRepository.findById(productId);
    }

    /*
     * Crea un producto.
     * 
     * @param product: Producto a crear.
     * 
     * @param username: Nombre de usuario del dueño del producto.
     * 
     * @return Producto creado.
     * 
     * @throws ProductDuplicateException: Si ya existe un producto con el mismo
     * nombre
     * 
     * @throws UserNotFoundException: Si no se encuentra el usuario dueño del
     * producto.
     */
    public Product create(Product product, String username) throws ProductDuplicateException, UserNotFoundException {
        List<Product> products = productRepository.findByName(product.getName());
        if (!products.isEmpty())
            throw new ProductDuplicateException();

        List<User> users = userRepository.findByUserName(username);

        if (users.isEmpty())
            throw new UserNotFoundException();

        product.setUser(users.get(0));
        return productRepository.save(product);
    }

    /*
     * Actualiza un producto.
     * 
     * @param product: Producto a actualizar.
     * 
     * @return Producto actualizado.
     * 
     * @throws ProductDuplicateException: Si ya existe un producto con el mismo
     * nombre
     */
    public Product update(Product product) throws ProductDuplicateException {
        List<Product> products = productRepository.findByName(product.getName());
        if (!products.isEmpty() && products.get(0).getId() != product.getId())
            throw new ProductDuplicateException();

        Product newProduct = productRepository.getReferenceById(product.getId());
        newProduct.setCategory(product.getCategory());
        newProduct.setDescription(product.getDescription());
        newProduct.setName(product.getName());
        newProduct.setPrice(product.getPrice());
        newProduct.setStock(product.getStock());
        return productRepository.save(newProduct);
    }

    /*
     * Elimina un producto.
     * 
     * @param productId: Id del producto a eliminar.
     * 
     * @return True si se eliminó, false si no se encontró.
     */
    public boolean delete(long productId) {
        Optional<Product> product = getProductById(productId);
        if (!product.isPresent())
            return false;
        productRepository.delete(product.get());
        return true;
    }

    // region Métodos privados

    /*
     * Crea una especificación para filtrar por el nombre
     * 
     * @param name: Nombre a filtrar.
     * 
     * @return Especificación creada.
     */
    private Specification<Product> specName(String name) {
        return ((root, query, cb) -> StringUtils.isEmpty(name) ? cb.conjunction()
                : cb.like(root.get("name"), "%" + name + "%"));
    }

    /*
     * Crea una especificación para filtrar por la descripción
     * 
     * @param description: Descripción a filtrar.
     * 
     * @return Especificación creada.
     */
    private Specification<Product> specDescription(String description) {
        return ((root, query, cb) -> StringUtils.isEmpty(description) ? cb.conjunction()
                : cb.like(root.get("description"), "%" + description + "%"));
    }

    /*
     * Crea una especificación para filtrar por el precio mínimo
     * 
     * @param value: Precio mínimo a filtrar.
     * 
     * @return Especificación creada.
     */
    private Specification<Product> specPriceFrom(Double value) {
        return ((root, query, cb) -> value == null || value == 0 ? cb.conjunction()
                : cb.greaterThanOrEqualTo(root.get("price"), value));
    }

    /*
     * Crea una especificación para filtrar por el precio máximo
     * 
     * @param value: Precio máximo a filtrar.
     * 
     * @return Especificación creada.
     */
    private Specification<Product> specPriceTo(Double value) {
        return ((root, query, cb) -> value == null || value == 0 ? cb.conjunction()
                : cb.lessThanOrEqualTo(root.get("price"), value));
    }

    /*
     * Crea una especificación para filtrar por stock
     * 
     * @param withStock: Si se debe filtrar por stock.
     * 
     * @return Especificación creada.
     */
    private Specification<Product> specWithStock(Boolean withStock) {
        return ((root, query, cb) -> withStock == null || withStock == false ? cb.conjunction()
                : cb.greaterThan(root.get("stock"), 0));
    }

    /*
     * Crea una especificación para filtrar por id
     * 
     * @param id: Id a filtrar.
     * 
     * @return Especificación creada.
     */
    private Specification<Product> specId(Integer id) {
        return ((root, query, cb) -> id == null ? cb.conjunction()
                : cb.equal(root.get("id"), id));
    }

    /*
     * Crea una especificación para filtrar por id de categoría
     * 
     * @param categoryId: Id de categoría a filtrar.
     * 
     * @return Especificación creada.
     */
    private Specification<Product> specCategoryId(Integer categoryId) {
        return ((root, query, cb) -> categoryId == null || categoryId == 0 ? cb.conjunction()
                : cb.equal(root.get("category").get("id"), categoryId));
    }

    // endregion
}
