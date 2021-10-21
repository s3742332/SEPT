package com.rmit.sept.bk_booksmicroservices;

import org.apache.logging.log4j.Level;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpringBootApplication
public class BooksmicroservicesApplication {



    public static void main(String[] args) {

        final Logger logger = LogManager.getLogger(BooksmicroservicesApplication.class);

        logger.log(Level.INFO, "Starting Application");

        SpringApplication.run(BooksmicroservicesApplication.class, args);
    }

//    @Bean
//    BCryptPasswordEncoder bCryptPasswordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
}
