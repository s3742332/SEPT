package com.rmit.sept.bk_loginservices.JUnit5Tests;
import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertEquals;
import java.util.Date;
import com.rmit.sept.bk_loginservices.model.User;
import org.junit.jupiter.api.BeforeEach;

public class UserTests {
    User user;
    
    @BeforeEach 
    void setUp() {
        user = new User();
        user.setId(34L);
        user.setFullName("Max Maximus");
        user.setUsername("Maxy");
        user.setPassword("Daxy");
        user.setConfirmPassword("Paxy");
        user.setCreate_At( new Date());
        user.setUserType("Customer");
        user.setApproved(true);
        user.setPhoneNumber("040118293");
        user.setAddress("Max Street");
    }

    @Test
    public void getIdTest(){
        assertEquals( (Long)34L,  user.getId());
    }

    @Test
    public void getFullNameTest(){
       assertEquals("Max Maximus" , user.getFullName() );
    }

    
    @Test
    public void getUsernameTest(){
        assertEquals("Maxy" , user.getUsername());
    }
    
    @Test
    public void getPasswordTest(){
        assertEquals("Daxy" , user.getPassword());
    }
    
    @Test
    public void getConfirmPasswordTest(){
        assertEquals("Paxy" , user.getConfirmPassword());
    }
    
    @Test
    public void getCreate_AtTest(){
        assertEquals(new Date() , user.getCreate_At());
    }

    @Test
    public void getUserTypeTest(){
        assertEquals("Customer" , user.getUserType());
    }

    @Test
    public void getAprrovedTest(){
        assertEquals(true , user.getApproved());
    }

    @Test
    public void getPhoneNumberTest(){
        assertEquals("040118293" , user.getPhoneNumber());
    }

    @Test
    public void getAddressTest(){
        assertEquals("Max Street" , user.getAddress());
    }
}
