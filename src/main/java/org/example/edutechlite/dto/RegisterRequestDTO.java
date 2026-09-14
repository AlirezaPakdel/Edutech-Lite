package org.example.edutechlite.dto;

import org.example.edutechlite.entity.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {
    private String username;
    private String password;
    private String email;
    private UserRole role;
}