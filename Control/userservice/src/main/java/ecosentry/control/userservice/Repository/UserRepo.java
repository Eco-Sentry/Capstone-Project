package ecosentry.control.userservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.userservice.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
    
}