package com.bangjek.client;

import com.bangjek.dto.response.UserResponse;
import jakarta.ws.rs.*;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "user-api")
@Path("/users")
public interface UserClient {

    @GET
    @Path("/{id}")
    UserResponse getById(@PathParam("id") Long id);
}