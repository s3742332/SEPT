package com.rmit.sept.bk_loginservices.LoginTestFiles;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.CustomUserDetailsService;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import com.rmit.sept.bk_loginservices.web.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.authentication.AuthenticationManager;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)

public class UserControllerTests {

    private UserController userController;

    private User user;
    
    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        User user = new User();
        user.setId(34L);
        user.setFullName("Max Maximus");
        user.setUsername("Maxy");
        user.setPassword("Daxy");
        user.setConfirmPassword("Daxy");
        user.setCreate_At( new Date(0));
        user.setUserType("Customer");
        user.setApproved(true);
        user.setPhoneNumber("040118293");
        user.setAddress("Max Street");
    }
//    @Test
//    @DisplayName("should authenticate the User and return responseEntity.ok")
//    void testRegisterUser(){
//        assertEquals(1, 1);
//    }
//    @Test
//    @DisplayName("should authenticate the User and return responseEntity.ok")
//    void testAuthenticateUser(){
//        assertEquals(1, 1);
//    }
//    @Test
//    @DisplayName("")
//    void testGetAllUsers(){
//        assertEquals("", "");
//    }
//    @Test
//    @DisplayName("")
//    void testGetAllPendingBusiness(){
//        assertEquals("", "");
//    }
//    @Test
//    @DisplayName("")
//    void testUpdateApproved(){
//        assertEquals("", "");
//    }
}
