package com.bangjek.controller;

import com.bangjek.dto.request.CreateOrderRequest;
import com.bangjek.dto.request.UpdateStatusRequest;
import com.bangjek.dto.response.OrderResponse;
import com.bangjek.service.OrderService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/orders")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OrderController {

    @Inject
    OrderService orderService;


    @POST
    public OrderResponse create(@Valid CreateOrderRequest request){
        return orderService.create(request);
    }

    // TODO: Buat endpoint GET /orders untuk menampilkan semua order
    @GET
    public List<OrderResponse> getAll() {
        return orderService.getAll();
    }


    @GET
    @Path("/{id}")
    public OrderResponse getById(@PathParam("id") Long id){
        return orderService.getById(id);
    }


    @PUT
    @Path("/{id}/status")
    public OrderResponse updateStatus(@PathParam("id") Long id,
                                      @Valid UpdateStatusRequest request){
        return orderService.updateStatus(id, request);
    }


    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Long id){
        orderService.delete(id);
    }
}