package org.example.edutechlite.service;

import org.example.edutechlite.entity.User;
import org.example.edutechlite.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user, String rawPassword) {
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("کاربر پیدا نشد: " + username));
    }

    public String login(String username, String rawPassword) {
        User user = findByUsername(username);

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new RuntimeException("رمز عبور اشتباه است");
        }

        // در اینجا می‌توانید توکن JWT خودتان را تولید و برگردانید
        return "Login successful! (Token can be generated here)";
    }
}