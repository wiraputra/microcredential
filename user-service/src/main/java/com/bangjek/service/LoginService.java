package com.bangjek.service;

import com.bangjek.DTO.request.LoginRequest;
import com.bangjek.DTO.response.LoginResponse;
import com.bangjek.entity.User;
import com.bangjek.repository.UserRepository;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Set;

@ApplicationScoped
public class LoginService {

    @Inject
    UserRepository userRepository;

    public LoginResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.email)
                .orElseThrow(()-> new NotFoundException("user tidak ditemukan"));
        if(!BCrypt.checkpw(request.password, user.getPassword())){
            throw new BadRequestException("password tidak ditemukan");
        }

        String token = Jwt.issuer("bangjek")
                .subject(user.getEmail())
                .claim("groups", Set.of(user.getRole().name()))
                .expiresIn(3600)
                .signWithSecret("this_is_super_secret_key_minimum_32_chars_123");

        System.out.println("TOKEN: " + token);
        return new LoginResponse(token);
    }
}
