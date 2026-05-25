package com.bangjek.DTO.response;
import com.bangjek.entity.Role;
import java.time.LocalDateTime;

public class UserResponse {
    public Long id;
    public String name;
    public String email;
    public String phone;
    public Role role;
    public LocalDateTime createdAt;
}
