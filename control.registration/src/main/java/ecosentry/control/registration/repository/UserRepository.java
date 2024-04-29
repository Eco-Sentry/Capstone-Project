package ecosentry.control.registration.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.registration.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
