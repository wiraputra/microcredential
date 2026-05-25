package com.bangjek.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateOrderRequest {

    @NotNull
    public Long customerId;

    @NotBlank
    public String pickup;

    @NotBlank
    public String destination;
}