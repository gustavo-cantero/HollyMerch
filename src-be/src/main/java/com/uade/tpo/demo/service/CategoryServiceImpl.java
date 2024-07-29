package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.exceptions.CategoryDuplicateException;
import com.uade.tpo.demo.repository.CategoryRepository;

/*
 * Implementación de los servicios de categorías.
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /*
     * Obtiene todas las categorías.
     * 
     * @param pageRequest: PageRequest con la paginación a aplicar.
     * 
     * @return Lista de categorías.
     */
    public Page<Category> getCategories(PageRequest pageable) {
        return categoryRepository.findAll(pageable);
    }

    /*
     * Obtiene una categoría por su id.
     * 
     * @param categoryId: Id de la categoría a buscar.
     * 
     * @return Categoría encontrada.
     */
    public Optional<Category> getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

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
    public Category createCategory(String description) throws CategoryDuplicateException {
        List<Category> categories = categoryRepository.findByDescription(description);
        if (categories.isEmpty())
            return categoryRepository.save(new Category(description));
        throw new CategoryDuplicateException();
    }
}
