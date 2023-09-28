package ecosentry.control.userservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.userservice.model.EcoSentry;

public interface SentryRepo extends JpaRepository<EcoSentry, Long>{
    
}
