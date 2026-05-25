package com.bangjek.repository;

import com.bangjek.entity.CustomerProfile;
import com.bangjek.entity.DriverProfile;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CustomerProfileRepository implements PanacheRepository<CustomerProfile> {
}
