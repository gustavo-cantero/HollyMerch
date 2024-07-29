package com.uade.tpo.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.ChangePasswordRequest;
import com.uade.tpo.demo.entity.dto.LoginResponse;
import com.uade.tpo.demo.entity.dto.UserRequest;
import com.uade.tpo.demo.exceptions.InvalidCredentialsException;
import com.uade.tpo.demo.exceptions.PasswordUnchangedException;
import com.uade.tpo.demo.exceptions.UnderAgeException;
import com.uade.tpo.demo.exceptions.UserDuplicateException;
import com.uade.tpo.demo.exceptions.UserNameChangeUnallowedException;
import com.uade.tpo.demo.exceptions.UserNotFoundException;
import com.uade.tpo.demo.service.UserService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Controlador de usuarios.
 */
@RestController
@CrossOrigin("*")
@RequestMapping("users")
public class UsersController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    /*
     * Obtiene un usuario por su id.
     * 
     * @param userId: Id del usuario a buscar.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable long userId) {
        Optional<User> result = userService.getUserById(userId);

        if (result.isPresent())
            return ResponseEntity.ok(result.get());

        return ResponseEntity.noContent().build();
    }

    /*
     * Crea un usuario.
     * 
     * @param userRequest: UserRequest con los datos del usuario a crear.
     * 
     * @throws UserDuplicateException: Si ya existe un usuario con el mismo nombre
     * de
     * usuario.
     */
    @PostMapping("signup")
    public ResponseEntity<Object> signUp(@RequestBody UserRequest userRequest)
            throws UserDuplicateException, UnderAgeException {
        User result = userService.signUp(userRequest);

        return ResponseEntity.created(URI.create("/users/" + result.getId())).body(result);
    }

    /*
     * Loguea un usuario.
     * 
     * @param userRequest: UserRequest con los datos del usuario a loguear.
     * 
     * @throws InvalidCredentialsException: Si las credenciales son inválidas.
     */
    @PostMapping("login")
    public ResponseEntity<Object> login(@RequestBody UserRequest userRequest) throws InvalidCredentialsException {
        LoginResponse result = userService.login(userRequest.getUserName(), userRequest.getPassword());
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{userId}/changepwd")
    public ResponseEntity<User> changePassword(@PathVariable long userId,
            @RequestBody ChangePasswordRequest changePasswordRequest)
            throws InvalidCredentialsException, PasswordUnchangedException, UserNotFoundException {
        User result = userService.changePassword(userId, changePasswordRequest);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<User> updateUserInfo(@PathVariable long userId, @RequestBody UserRequest updateUserRequest)
            throws InvalidCredentialsException, UserNotFoundException, UnderAgeException,
            UserNameChangeUnallowedException {
        User result = userService.updateUserInfo(userId, updateUserRequest);
        return ResponseEntity.ok(result);
    }

}