package eco.sentry.central.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserR extends JpaRepository<User, Long>{
    
}
