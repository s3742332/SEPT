package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
import com.rmit.sept.bk_loginservices.services.CustomUserDetailsService;
import com.rmit.sept.bk_loginservices.services.MapValidationErrorService;
import com.rmit.sept.bk_loginservices.services.UserService;
import com.rmit.sept.bk_loginservices.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;

import java.sql.PreparedStatement;
import java.util.ArrayList;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers(){
        Iterable<User> userList = userService.getAllUsers();
        
        return  new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllPendingBusiness")
    public ResponseEntity<?> getAllPendingBusiness(){
        Iterable<User> userList = userService.getAllUsers();
        ArrayList<User> unapprovedBusiness = new ArrayList<User>();
        for (User user : userList){
            if (user.getUserType().equals("seller") && user.getApproved() == null) {
                unapprovedBusiness.add(user);
            }
        }

        userList = unapprovedBusiness;
        
        return  new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllApprovedUsers")
    public ResponseEntity<?> getAllApprovedBusiness(){
        Iterable<User> userList = userService.getAllApprovedUsers();
        
        return  new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/updateApproved")
    public void updateApproved(@RequestBody User user, BindingResult result) {
        if (user.getApproved()) {
            userService.saveUser(user);
        } else {
            userService.deleteUser(user);
        }
    }
}
