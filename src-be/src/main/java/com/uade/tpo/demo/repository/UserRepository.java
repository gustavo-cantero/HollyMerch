package com.uade.tpo.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.uade.tpo.demo.entity.User;

/*
 * Repositorio de usuarios.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /*
     * Busca un producto por su descripción.
     * 
     * @param description: Descripción del producto a buscar.
     * 
     * @return Lista de productos que cumplen con la descripción.
     */
    @Query(value = "SELECT c FROM User c WHERE c.userName = ?1")
    List<User> findByUserName(String userName);
}
