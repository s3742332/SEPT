package com.rmit.sept.bk_loginservices.services;

import java.util.ArrayList;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {

        /*
         * newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
         * //Username has to be unique (exception) // Make sure that password and
         * confirmPassword match // We don't persist or show the confirmPassword return
         * userRepository.save(newUser);
         */
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            // Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }

    public User saveUserDetails(User newUser) {

        /*
         * newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
         * //Username has to be unique (exception) // Make sure that password and
         * confirmPassword match // We don't persist or show the confirmPassword return
         * userRepository.save(newUser);
         */
        try {
            return userRepository.save(newUser);

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }

    public Iterable<User> getAllApprovedUsers() {
        try {
            Iterable<User> allUsers = userRepository.findAll();
            ArrayList<User> filteredUsers = new ArrayList<User>();
            for (User user : allUsers) {
                if (user.getApproved()) {
                    filteredUsers.add(user);
                }
            }
            allUsers = filteredUsers;
            return allUsers;

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Unable to retrieve approved user list");
        }

    }

    public Iterable<User> getAllUsers() {
        try {
            Iterable<User> allUsers = userRepository.findAll();
            
            return allUsers;

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Unable to retrieve user list");
        }

    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

}
