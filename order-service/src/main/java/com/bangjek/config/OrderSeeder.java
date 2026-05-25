package com.bangjek.config;

import com.bangjek.entity.Order;
import com.bangjek.repository.OrderRepository;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class OrderSeeder {

    @Inject
    OrderRepository orderRepository;

    void onStart(@Observes StartupEvent ev) {
        seed();
    }

    @Transactional
    void seed() {

        if (orderRepository.count() > 0) {
            return;
        }

        createOrder(2L, "Denpasar", "Jimbaran");
        createOrder(2L, "Kuta", "Sanur");
        createOrder(2L, "Ubud", "Seminyak");
    }

    private void createOrder(Long customerId, String pickup, String destination) {
        Order order = new Order();
        order.customerId = customerId;
        order.pickup = pickup;
        order.destination = destination;
        order.status = "CREATED";

        orderRepository.persist(order);
    }
}