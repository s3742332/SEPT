package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UserIsBannedException;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_loginservices.payload.LoginRequest;
import com.rmit.sept.bk_loginservices.payload.PasswordChange;
import com.rmit.sept.bk_loginservices.security.JwtTokenProvider;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.Valid;

import static com.rmit.sept.bk_loginservices.security.SecurityConstant.TOKEN_PREFIX;

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
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        // Validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        Iterable<User> userList = userService.getAllUsers();
        for (User user : userList) {
            if (user.getUsername().equals(loginRequest.getUsername())) {
                if (!user.getApproved()) {
                    throw new UserIsBannedException("Username '" + loginRequest.getUsername() + "' is Banned");
                }
            }
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        Iterable<User> userList = userService.getAllUsers();

        return new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllUnapprovedUsers")
    public ResponseEntity<?> getAllUnapprovedUsers() {
        Iterable<User> userList = userService.getAllUsers();
        ArrayList<User> unapprovedUser = new ArrayList<User>();
        for (User user : userList) {
            if (!user.getApproved()) {
                unapprovedUser.add(user);
            }
        }

        userList = unapprovedUser;

        return new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAllApprovedUsers")
    public ResponseEntity<?> getAllApprovedBusiness() {
        Iterable<User> userList = userService.getAllApprovedUsers();

        return new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getUser/{name}")
    public ResponseEntity<?> getUser(@PathVariable String name) {
        Iterable<User> userList = userService.getAllUsers();
        ArrayList<User> user = new ArrayList<User>();
        for (User user1 : userList) {
            if (user1.getUsername().equals(name)) {
                user.add(user1);
            }
        }
        userList = user;
        return new ResponseEntity<Iterable<User>>(userList, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/updateApproved")
    public void updateApproved(@RequestBody User user, BindingResult result) {
        if (user.getApproved()) {
            userService.saveUserDetails(user);
        } else {
            userService.deleteUser(user);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/blockUser")
    public void blockUser(@RequestBody Long id) {
        Iterable<User> userList = userService.getAllApprovedUsers();
        for (User user : userList) {
            if (user.getId() == id) {
                user.setApproved(false);
                userRepository.save(user);
            }
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/changePassword")
    public void changePassword(@RequestBody PasswordChange passwordChange) {
        Iterable<User> userList = userService.getAllApprovedUsers();
        for (User user : userList) {
            if (user.getId() == passwordChange.getId()) {
                user.setPassword(bCryptPasswordEncoder.encode(passwordChange.getPassword()));
                userRepository.save(user);
            }
        }

    }
}
