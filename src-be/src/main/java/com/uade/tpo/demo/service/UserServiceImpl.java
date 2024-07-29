package com.uade.tpo.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.uade.tpo.demo.repository.UserRepository;

/*
 * Implementación de los servicios de usuarios.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    /*
     * Obtiene todos los usuarios.
     * 
     * @return Lista de usuarios.
     */
    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /*
     * Obtiene un usuario por su id.
     * 
     * @param userId: Id del usuario a buscar.
     * 
     * @return Usuario encontrado.
     */
    @Override
    public Optional<User> getUserById(long userId) {
        return userRepository.findById(userId);
    }

    /*
     * Crea un usuario.
     * 
     * @param newUser: UserRequest con los datos del usuario a crear.
     * 
     * @return Usuario creado.
     * 
     * @throws UserDuplicateException: Si ya existe un usuario con el mismo nombre
     * de usuario.
     */
    @Override
    public User signUp(UserRequest newUser) throws UserDuplicateException, UnderAgeException {
        List<User> users = getUsers();

        if (users.stream().anyMatch(user -> user.getUserName().equals(newUser.getUserName())))
            throw new UserDuplicateException();
        if (users.stream().anyMatch(user -> user.getEmail().equals(newUser.getEmail())))
            throw new UserDuplicateException();
        if (!User.isAgeAllowed(newUser.getBirthDate()))
            throw new UnderAgeException();
        return userRepository.save(new User(
                newUser.getEmail(),
                newUser.getName(),
                newUser.getLastName(),
                newUser.getPassword(),
                newUser.getUserName(),
                newUser.getBirthDate()));
    }

    /*
     * Loguea un usuario.
     * 
     * @param userName: Nombre de usuario.
     * 
     * @param password: Contraseña.
     * 
     * @return true si el usuario se logueó correctamente, false en caso contrario.
     * 
     * @throws InvalidCredentialsException: Si las credenciales son inválidas.
     */
    @Override
    public LoginResponse login(String userName, String password) throws InvalidCredentialsException {
        List<User> users = getUsers();

        Optional<User> authenticatedUser = users.stream()
                .filter(user -> user.getUserName().equals(userName) && user.getPassword().equals(password))
                .findFirst();

        if (authenticatedUser.isPresent())
            return new LoginResponse(authenticatedUser.get().getId(), authenticatedUser.get().getUserName());
        throw new InvalidCredentialsException();
    }

    /*
     * Actualiza la información de un usuario.
     * 
     * @param updatedUser: UserRequest con los datos actualizados del usuario.
     * 
     * @return Usuario actualizado.
     */
    @Override
    public User updateUserInfo(long userId, UserRequest updatedUser)
            throws InvalidCredentialsException, UnderAgeException, UserNameChangeUnallowedException,
            UserNotFoundException {

        Optional<User> userById = userRepository.findById(userId);
        if (userById.isPresent()) {
            User user = userById.get();
            boolean isUserAllowed = user.getPassword().equals(updatedUser.getPassword());

            if (isUserAllowed) {
                if (updatedUser.getName() != null && updatedUser.getName() != user.getName()) {
                    user.setName(updatedUser.getName());
                }

                if (updatedUser.getLastName() != null && updatedUser.getLastName() != user.getLastName()) {
                    user.setLastName(updatedUser.getLastName());
                }

                if (updatedUser.getEmail() != null && updatedUser.getEmail() != user.getEmail()) {
                    user.setEmail(updatedUser.getEmail());
                }

                if (User.isAgeAllowed(updatedUser.getBirthDate())) {
                    if (updatedUser.getBirthDate() != user.getBirthDate()) {
                        user.setBirthDate(updatedUser.getBirthDate());
                    }

                } else {
                    throw new UnderAgeException();
                }

                if (updatedUser.getUserName() != null && updatedUser.getUserName() != user.getUserName()) {
                    throw new UserNameChangeUnallowedException();
                }

                return userRepository.save(user);
            } else {
                throw new InvalidCredentialsException();
            }
        } else {
            throw new UserNotFoundException();
        }
    }

    /*
     * Cambia la contraseña de un usuario.
     * 
     * @param newPassword: Nueva contraseña.
     * 
     * @return Usuario con la contraseña cambiada.
     */
    @Override
    public User changePassword(long userId, ChangePasswordRequest changePasswordRequest)
            throws InvalidCredentialsException, PasswordUnchangedException, UserNotFoundException {
        Optional<User> userById = userRepository.findById(userId);
        if (userById.isPresent()) {
            User user = userById.get();
            boolean isUserAllowed = user.getPassword().equals(changePasswordRequest.getOldPassword());

            if (isUserAllowed) {
                if (!user.getPassword().equals(changePasswordRequest.getNewPassword())) {
                    user.setPassword(changePasswordRequest.getNewPassword());
                    return userRepository.save(user);
                } else {
                    throw new PasswordUnchangedException();
                }
            } else {
                throw new InvalidCredentialsException();
            }
        } else {
            throw new UserNotFoundException();
        }
    }

}
