package ecosentry.control.userservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.userservice.model.Password;

public interface PasswordRepo extends JpaRepository<Password, Long>{
    
}
