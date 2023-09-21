package ecosentry.control.userservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.userservice.model.Registration;

public interface RegistrationRepo extends JpaRepository<Registration, Long>{
    
}