package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.entity.dto.ListProductRequest;
import com.uade.tpo.demo.exceptions.ProductDuplicateException;
import com.uade.tpo.demo.exceptions.UserNotFoundException;

public interface ProductService {

    /*
     * Obtiene todos los productos.
     * 
     * @return Lista de productos.
     */
    public List<Product> getProducts();

    /*
     * Obtiene todos últimos productos.
     * 
     * @return Lista de los últimos productos.
     */
    public List<Product> getLasts();

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
    public Page<Product> listProducts(ListProductRequest request, PageRequest pageable);

    /*
     * Busca un producto por su id.
     * 
     * @param productId: Id del producto a buscar.
     * 
     * @return Producto encontrado.
     */
    public Optional<Product> getProductById(long productId);

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
    public Product create(Product product, String username) throws ProductDuplicateException, UserNotFoundException;

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
    public Product update(Product product) throws ProductDuplicateException;

    /*
     * Elimina un producto.
     * 
     * @param productId: Id del producto a eliminar.
     * 
     * @return true si se eliminó correctamente, false en caso contrario.
     */
    public boolean delete(long productId);
}