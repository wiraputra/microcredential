package com.bangjek.config;

import com.bangjek.entity.CustomerProfile;
import com.bangjek.entity.DriverProfile;
import com.bangjek.entity.Role;
import com.bangjek.entity.User;
import com.bangjek.repository.CustomerProfileRepository;
import com.bangjek.repository.DriverProfileRepository;
import com.bangjek.repository.UserRepository;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;

@ApplicationScoped
public class DataSeeder {

    @Inject
    UserRepository userRepository;

    @Inject
    DriverProfileRepository driverRepo;

    @Inject
    CustomerProfileRepository customerRepo;

    void onStart(@Observes StartupEvent ev) {
        seed();
    }

    @Transactional
    void seed() {


        if (userRepository.count() > 0) {
            return;
        }


        createUser("Admin", "admin@mail.com", "+628111111111", "admin123", Role.ADMIN);


        createUser("Customer", "customer@mail.com", "+628222222222", "customer123", Role.CUSTOMER);


        createUser("Driver", "driver@mail.com", "+628333333333", "driver123", Role.DRIVER);
    }

    private void createUser(String name, String email, String phone, String password, Role role) {

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
        user.setRole(role);

        userRepository.persist(user);


        switch (role) {

            case DRIVER:
                DriverProfile driver = new DriverProfile();
                driver.setUser(user);
                driver.setVehicleType("Motor");
                driver.setLicensePlate("DK1234XX");
                driverRepo.persist(driver);
                break;

            case CUSTOMER:
                CustomerProfile customer = new CustomerProfile();
                customer.setUser(user);
                customer.setAddress("Denpasar");
                customerRepo.persist(customer);
                break;

            default:

                break;
        }
    }
}