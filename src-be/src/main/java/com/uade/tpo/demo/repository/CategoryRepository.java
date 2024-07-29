package com.uade.tpo.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.uade.tpo.demo.entity.Category;

/*
 * Repositorio de categorías.
 
 */
public interface CategoryRepository extends JpaRepository<Category, Long> { // Hybernate va a mappear el Objeto
                                                                            // Category, y lo manda a la BD relational

    /*
     * Busca una categoría por su descripción.
     */
    @Query(value = "SELECT c FROM Category c WHERE c.description = ?1")
    List<Category> findByDescription(String description);
}
