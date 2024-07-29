
package com.uade.tpo.demo.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.exceptions.CategoryDuplicateException;

/*
 * Servicio de categorías.
 */
public interface CategoryService {
    /*
     * Obtiene todas las categorías.
     * 
     * @param pageRequest: PageRequest con la paginación a aplicar.
     * 
     * @return Lista de categorías.
     */
    public Page<Category> getCategories(PageRequest pageRequest);

    /*
     * Obtiene una categoría por su id.
     * 
     * @param categoryId: Id de la categoría a buscar.
     * 
     * @return Categoría encontrada.
     */
    public Optional<Category> getCategoryById(Long categoryId);

    /*
     * Crea una categoría.
     * 
     * @param description: Descripción de la categoría a crear.
     * 
     * @return Categoría creada.
     * 
     * @throws CategoryDuplicateException: Si ya existe una categoría con la misma
     * descripción.
     */
    public Category createCategory(String description) throws CategoryDuplicateException;
}