package com.bangjek.controller;

import com.bangjek.DTO.request.RegisterRequest;
import com.bangjek.DTO.response.UserResponse;
import com.bangjek.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserController {
    @Inject
    UserService userService;

    @POST
    public UserResponse create (@Valid RegisterRequest request){
        return userService.create(request);
    }

    @GET
    @Path("/{id}")
    public  UserResponse getById(@PathParam("id") Long id){
        return userService.getById(id);
    }

    @GET
    public List<UserResponse> getAll(){
        return userService.getAll();
    }

//   TODO: Buat Controller untuk Update
    @PUT
    @Path("/{id}")
    public UserResponse update(@PathParam("id") Long id, @Valid RegisterRequest request) {
        return userService.update(id, request);
    }

    @DELETE
    @Path("/{id}")
    public void deleteById(@PathParam("id") Long id){

        userService.delete(id);
    }


}
