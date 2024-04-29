package ecosentry.authproxy.security;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.authproxy.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
