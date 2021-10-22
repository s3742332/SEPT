package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LogManager.getLogger(CustomUserDetailsService.class);


    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user==null)
        {
            logger.log(org.apache.logging.log4j.Level.INFO, "No user with that username");

            new UsernameNotFoundException("User not found");
        }
        return user;
    }

    @Transactional
    public User loadUserById(Long id){
        User user = userRepository.getById(id);
        if(user==null)
        {
            logger.log(org.apache.logging.log4j.Level.INFO, "No user with that ID");

            new UsernameNotFoundException("User not found");
        }
        return user;
    }
}