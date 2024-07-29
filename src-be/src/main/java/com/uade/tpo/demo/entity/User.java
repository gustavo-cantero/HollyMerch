package com.uade.tpo.demo.entity;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

/*
 * Entidad para los usuarios.
 */
@Data
@Entity
public class User {
    /*
     * Constructor para la creación de un usuario.
     */
    public User() {
    }

    /*
     * Constructor para la creación de un usuario.
     * 
     * @param email Email del usuario.
     * 
     * @param name Nombre del usuario.
     * 
     * @param lastName Apellido del usuario.
     * 
     * @param password Contraseña del usuario.
     * 
     * @param userName Nombre de usuario del usuario.
     * 
     * @param age Edad del usuario.
     */
    public User(String email, String name, String lastName, String password, String userName, LocalDate birthDate) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.userName = userName;
        this.birthDate = birthDate;
        this.age = getAge(birthDate);
    }

    public User(Long id, String email, String name, String lastName, String password, String userName, LocalDate birthDate) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.userName = userName;
        this.birthDate = birthDate;
        this.age = getAge(birthDate);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String lastName;

    @Column
    private String password;

    @Column
    private String userName;

    @Column
    private LocalDate birthDate;

    private Integer age;

    public static int getAge(LocalDate birthDate) {
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    public static boolean isAgeAllowed(LocalDate birthDate) {
        return getAge(birthDate) >= 18;
    }

    // @OneToMany(mappedBy = "user")
    // private List<Order> orders;
}
