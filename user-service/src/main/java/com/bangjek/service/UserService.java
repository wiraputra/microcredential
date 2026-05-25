package com.bangjek.service;

import com.bangjek.DTO.request.RegisterRequest;
import com.bangjek.DTO.response.UserResponse;
import com.bangjek.entity.CustomerProfile;
import com.bangjek.entity.DriverProfile;
import com.bangjek.entity.Role;
import com.bangjek.entity.User;
import com.bangjek.repository.CustomerProfileRepository;
import com.bangjek.repository.DriverProfileRepository;
import com.bangjek.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import java.util.ArrayList;
import java.util.List;
import org.mindrot.jbcrypt.BCrypt;

@ApplicationScoped
public class UserService {
    @Inject
    UserRepository userRepository;
    @Inject
    DriverProfileRepository driverProfileRepository;
    @Inject
    CustomerProfileRepository customerProfileRepository;

    private UserResponse mapToResponse(User user) {
        UserResponse resp = new UserResponse();
        resp.id = user.getId();
        resp.name = user.getName();
        resp.email = user.getEmail();
        resp.phone = user.getPhone();
        resp.role = user.getRole();
        resp.createdAt = user.getCreatedAt();
        return resp;
    }

    @Transactional
    public UserResponse create(RegisterRequest request){

        if(userRepository.existsByEmail(request.email)){
            throw new BadRequestException("Email already exists");
        }
        if(userRepository.existsByPhone(request.phone)){
            throw new BadRequestException("Phone already exists");
        }
        User user = new User();
        user.setName(request.name);
        String hashed = BCrypt.hashpw(request.password, BCrypt.gensalt());
        user.setPassword(hashed);
        user.setEmail(request.email);
        user.setPhone(request.phone);
        user.setRole(request.role);

        userRepository.persist(user);

        switch (user.getRole()){
            case DRIVER:
                DriverProfile driver = new DriverProfile();
                driver.setUser(user);
                driver.setVehicleType("DEFAULT"); // sementara
                driver.setLicensePlate("DEFAULT");
                driverProfileRepository.persist(driver);
                break;

            case CUSTOMER:
                CustomerProfile customer = new CustomerProfile();
                customer.setUser(user);
                customer.setAddress("DEFAULT");
                customerProfileRepository.persist(customer);
                break;

            default:
                break;
        }

        return  mapToResponse(user);
    }

    public List<UserResponse> getAll() {
        return userRepository.listAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public UserResponse getById(Long id) {
        User user = userRepository.findById(id);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        return mapToResponse(user);
    }

    // TODO: Buat method Update, handle perubahan role (hapus profile lama & buat baru)
    @Transactional
    public UserResponse update(Long id, RegisterRequest request) {
        User user = userRepository.findById(id);
        if (user == null) {
            throw new NotFoundException("User not found");
        }

        if (!user.getEmail().equals(request.email) && userRepository.existsByEmail(request.email)) {
            throw new BadRequestException("Email already exists");
        }
        if (!user.getPhone().equals(request.phone) && userRepository.existsByPhone(request.phone)) {
            throw new BadRequestException("Phone already exists");
        }

        user.setName(request.name);
        user.setEmail(request.email);
        user.setPhone(request.phone);
        if (request.password != null && !request.password.isEmpty()) {
            user.setPassword(BCrypt.hashpw(request.password, BCrypt.gensalt()));
        }

        Role oldRole = user.getRole();
        Role newRole = request.role;

        if (oldRole != newRole) {
            if (oldRole == Role.CUSTOMER) {
                customerProfileRepository.delete("user", user);
            } else if (oldRole == Role.DRIVER) {
                driverProfileRepository.delete("user", user);
            }

            user.setRole(newRole);

            if (newRole == Role.CUSTOMER) {
                CustomerProfile customer = new CustomerProfile();
                customer.setUser(user);
                customer.setAddress("DEFAULT");
                customerProfileRepository.persist(customer);
            } else if (newRole == Role.DRIVER) {
                DriverProfile driver = new DriverProfile();
                driver.setUser(user);
                driver.setVehicleType("DEFAULT");
                driver.setLicensePlate("DEFAULT");
                driverProfileRepository.persist(driver);
            }
        }

        return mapToResponse(user);
    }


    @Transactional
    public void delete(Long id){
        User user = userRepository.findById(id);
        if(user == null){
            throw new NotFoundException("User not found");
        }

        // TODO: Perbaiki error: saat delete user, pastikan semua profile terhapus
        if (user.getRole() == Role.CUSTOMER) {
            customerProfileRepository.delete("user", user);
        } else if (user.getRole() == Role.DRIVER) {
            driverProfileRepository.delete("user", user);
        }


        userRepository.delete(user);
    }

}
