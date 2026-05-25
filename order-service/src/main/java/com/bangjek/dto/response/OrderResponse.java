package com.bangjek.dto.response;

import java.time.LocalDateTime;

public class OrderResponse {

    public Long id;
    public Long customerId;
    public String pickup;
    public String destination;
    public String status;
    public LocalDateTime createdAt;
}