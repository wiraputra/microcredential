package com.bangjek.repository;

import com.bangjek.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
    public Optional<User> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }
    public boolean existsByEmail(String email) {
        return count ("email", email) > 0;
    }
    public boolean existsByPhone(String phone) {
        return count ("phone", phone) > 0;
    }
}
