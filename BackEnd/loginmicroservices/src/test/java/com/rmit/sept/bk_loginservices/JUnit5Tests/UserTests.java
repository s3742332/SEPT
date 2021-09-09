package com.rmit.sept.bk_loginservices.JUnit5Tests;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import com.rmit.sept.bk_loginservices.model.User;

import org.junit.Test;

public class UserTests {
    
    @Test
    public void getIdTest(){
        User user1 = new User();
        user1.setId(34L);
        Long value = (Long)user1.getId();
        Long num = 34L;
        assertEquals(num,  value);
    }

    @Test
    public void getFullNameTest(){
        User user1 = new User();
        user1.setFullName("Max Maximus");
        assertEquals("Max Maximus" , user1.getFullName());
    }

    
    @Test
    public void getUsernameTest(){
        User user1 = new User();
        user1.setUsername("Maxy");
        assertEquals("Maxy" , user1.getUsername());
    }
    
    @Test
    public void getPasswordTest(){
        User user1 = new User();
        user1.setPassword("Daxy");
        assertEquals("Daxy" , user1.getPassword());
    }
    
    @Test
    public void getConfirmPasswordTest(){
        User user1 = new User();
        user1.setConfirmPassword("Paxy");
        assertEquals("Paxy" , user1.getConfirmPassword());
    }
    
    //Use date object
    @Test
    public void getCreate_AtTest(){
        User user1 = new User();
        Date curDate = new Date();
        user1.setCreate_At(curDate);
        assertEquals(new Date() , user1.getCreate_At());
    }

    @Test
    public void getUserTypeTest(){
        User user1 = new User();
        user1.setUserType("Customer");
        assertEquals("Customer" , user1.getUserType());
    }

    @Test
    public void getAprrovedTest(){
        User user1 = new User();
        user1.setApproved(true);
        assertEquals(true , user1.getApproved());
    }

    @Test
    public void getPhoneNumberTest(){
        User user1 = new User();
        user1.setPhoneNumber("040118293");
        assertEquals("040118293" , user1.getPhoneNumber());
    }

    @Test
    public void getAddressTest(){
        User user1 = new User();
        user1.setAddress("Max Street");
        assertEquals("Max Street" , user1.getAddress());
    }
}
