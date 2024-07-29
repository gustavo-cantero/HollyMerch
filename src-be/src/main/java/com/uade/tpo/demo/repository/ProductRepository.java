package com.uade.tpo.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import com.uade.tpo.demo.entity.Product;

import jakarta.annotation.Nullable;

/*
 * Repositorio de productos.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    /*
     * Busca un producto por su descripción.
     * 
     * @param description: Descripción del producto a buscar.
     * 
     * @return Lista de productos que cumplen con la descripción.
     */
    @Query(value = "SELECT c FROM Product c WHERE c.description = ?1")
    List<Product> findByDescription(String description);

    /*
     * Busca un producto por su descripción.
     * 
     * @param description: Descripción del producto a buscar.
     * 
     * @return Lista de productos que cumplen con la descripción.
     */
    @Query(value = "SELECT c FROM Product c ORDER BY c.id DESC LIMIT 20")
    List<Product> findLasts();

    /*
     * Busca un producto por su nombre.
     * 
     * @param description: Nombre del producto a buscar.
     * 
     * @return Lista de productos que cumplen con el nombre.
     */
    @Query(value = "SELECT c FROM Product c WHERE c.name = ?1")
    List<Product> findByName(String name);

    /*
     * Busca todos los productos que cumplan con las condiciones especificadas en el
     * request.
     * 
     * @param request: ListProductRequest con los filtros a aplicar.
     * 
     * @param pageable: Paginación de los resultados.
     * 
     * @return Lista de productos que cumplen con los filtros.
     */
    Page<Product> findAll(@Nullable Specification<Product> spec, @NonNull Pageable pageable);
}
