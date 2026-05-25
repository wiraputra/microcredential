package com.bangjek.service;

import com.bangjek.client.UserClient;
import com.bangjek.dto.request.CreateOrderRequest;
import com.bangjek.dto.request.UpdateStatusRequest;
import com.bangjek.dto.response.OrderResponse;
import com.bangjek.dto.response.UserResponse;
import com.bangjek.entity.Order;
import com.bangjek.repository.OrderRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class OrderService {

    @Inject
    OrderRepository orderRepository;

    @Inject
    @RestClient
    UserClient userClient;

    private OrderResponse map(Order order){
        OrderResponse res = new OrderResponse();
        res.id = order.id;
        res.customerId = order.customerId;
        res.pickup = order.pickup;
        res.destination = order.destination;
        res.status = order.status;
        res.createdAt = order.createdAt;
        return res;
    }

    //  create
    @Transactional
    public OrderResponse create(CreateOrderRequest request){

        UserResponse user;

        try {
            user = userClient.getById(request.customerId);

        } catch (Exception e) {
            // fallback sederhana
            System.out.println("User Service DOWN: " + e.getMessage());

            throw new BadRequestException("User service unavailable. Please try again later.");
        }

//     TODO: Buat validasi bahwa user adalah CUSTOMER
        if (!"CUSTOMER".equalsIgnoreCase(user.role)) {
            throw new BadRequestException("Hanya user dengan role CUSTOMER yang dapat membuat order");
        }

        Order order = new Order();
        order.customerId = request.customerId;
        order.pickup = request.pickup;
        order.destination = request.destination;
        order.status = "CREATED";

        orderRepository.persist(order);

        return map(order);
    }

    //  TODO: Buat Method getAll orders
    public List<OrderResponse> getAll() {
        return orderRepository.listAll().stream().map(this::map).toList();
    }


    // getbyid
    public OrderResponse getById(Long id){
        Order order = orderRepository.findById(id);

        if(order == null){
            throw new NotFoundException("Order tidak ditemukan");
        }

        return map(order);
    }

    // update status
    @Transactional
    public OrderResponse updateStatus(Long id, UpdateStatusRequest request){
        Order order = orderRepository.findById(id);

        if(order == null){
            throw new NotFoundException("Order tidak ditemukan");
        }

        // simple validation
        if(!request.status.equals("CREATED") &&
                !request.status.equals("PROCESS") &&
                !request.status.equals("COMPLETED")){
            throw new BadRequestException("Status tidak valid");
        }

        order.status = request.status;

        return map(order);
    }

    // hapus
    @Transactional
    public void delete(Long id){
        Order order = orderRepository.findById(id);

        if(order == null){
            throw new NotFoundException("Order tidak ditemukan");
        }

        orderRepository.delete(order);
    }
}