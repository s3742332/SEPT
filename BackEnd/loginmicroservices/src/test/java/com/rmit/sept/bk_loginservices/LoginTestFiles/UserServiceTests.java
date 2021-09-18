package com.rmit.sept.bk_loginservices.LoginTestFiles;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.services.UserService;
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
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)

public class UserServiceTests {
    User user;
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
    @Test
    @DisplayName("Should save the user to userRepository")
    void testSaveUser(){
        User newUser = new User();
        Mockito.when(userRepository.save(newUser)).thenReturn(newUser);
    }
    @Test
    @DisplayName("Should return all Users in userRepository")
    void testGetAllUsers(){
        when(userRepository.findAll()).thenReturn(Stream
                .of(user).collect(Collectors.toList()));
        assertEquals(1, ((List<User>) userService.getAllUsers()).size());
    }
    @Test
    @DisplayName("Should delete user from userRepository")
    public void whenDelete_thenObjectShouldBeDeleted() {
        userService.deleteUser(user);
        Mockito.verify(userRepository, times(1)).delete(user);
    }
}