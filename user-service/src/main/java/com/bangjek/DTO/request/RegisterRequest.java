package com.bangjek.DTO.request;

import com.bangjek.entity.Role;
import io.smallrye.common.constraint.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank
    public String name;

    @Email
    @NotBlank
    public String email;

    @NotBlank
    public String phone;

    @NotBlank
//  TODO: Tambahkan validasi password minimal 6 karakter menggunakan annotation
    @Size(min = 6, message = "Password must be at least 6 characters")
    public String password;

    @NotNull
    public Role role;
}
