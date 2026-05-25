package com.bangjek.controller;

import com.bangjek.DTO.request.LoginRequest;
import com.bangjek.DTO.response.LoginResponse;
import com.bangjek.service.LoginService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;

@Path("/login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginController {
    @Inject
    LoginService loginService;
    @POST
    public LoginResponse login(@Valid LoginRequest request){
        return loginService.login(request);
    }

}
