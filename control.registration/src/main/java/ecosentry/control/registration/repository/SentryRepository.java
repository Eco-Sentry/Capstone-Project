package ecosentry.control.registration.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.registration.model.Sentry;

public interface SentryRepository extends JpaRepository<Sentry, UUID> {
    
}

