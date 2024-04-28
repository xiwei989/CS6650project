package net.project.shopApp.controller;

import net.project.shopApp.model.LoginDTO;
import net.project.shopApp.model.User;
import net.project.shopApp.response.LoginResponse;
import net.project.shopApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user) {
        try{
            userService.addUser(user);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
        LoginResponse message = userService.loginUser(loginDTO);
        return ResponseEntity.ok(message);
    }



}
