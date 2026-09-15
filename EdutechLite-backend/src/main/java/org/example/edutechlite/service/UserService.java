package org.example.edutechlite.service;

import org.example.edutechlite.entity.User;
import org.example.edutechlite.repository.UserRepository;
import org.example.edutechlite.security.JwtTokenProvider; // 1. ایمپورت ابزار توکن
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider; // 2. تعریف متغیر

    // 3. اضافه کردن به سازنده (Constructor Injection)
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public User register(User user, String rawPassword) {
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("user not found :" + username));
    }

    public String login(String username, String rawPassword) {
        User user = findByUsername(username);

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new RuntimeException("wrong password ?!");
        }

        // 4. تولید و برگرداندن توکن واقعی با استفاده از متدی که قبلاً نوشته بودی
        return jwtTokenProvider.generateTokenFromUsername(user.getUsername());
    }
}