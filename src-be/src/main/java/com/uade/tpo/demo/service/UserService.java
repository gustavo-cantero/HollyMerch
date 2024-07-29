package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

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

/*
 * Servicio para la gestión de usuarios.
 */
public interface UserService {

    /*
     * Obtiene todos los usuarios.
     */
    public List<User> getUsers();

    public Optional<User> getUserById(long userId);

    public User signUp(UserRequest newUser) throws UserDuplicateException, UnderAgeException;

    public LoginResponse login(String userName, String password) throws InvalidCredentialsException;

    public User updateUserInfo(long userId, UserRequest updatedUser) throws InvalidCredentialsException, UnderAgeException, UserNameChangeUnallowedException, UserNotFoundException;

    public User changePassword(long userId, ChangePasswordRequest changePasswordRequest) throws InvalidCredentialsException, PasswordUnchangedException, UserNotFoundException;
 
}
