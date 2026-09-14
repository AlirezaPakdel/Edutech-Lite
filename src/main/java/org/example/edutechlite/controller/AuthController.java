package org.example.edutechlite.controller;

import org.example.edutechlite.dto.LoginRequestDTO;
import org.example.edutechlite.dto.RegisterRequestDTO;
import org.example.edutechlite.entity.User;
import org.example.edutechlite.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequestDTO requestDTO) {
        User user = new User();
        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setRole(requestDTO.getRole());

        User registeredUser = userService.register(user, requestDTO.getPassword());
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO requestDTO) {
        String result = userService.login(requestDTO.getUsername(), requestDTO.getPassword());
        return ResponseEntity.ok(result);
    }
}