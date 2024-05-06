package ecosentry.control.registration.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.registration.model.Sentry;

public interface SentryRepository extends JpaRepository<Sentry, UUID> {
    List<Sentry> findByUserId(Long userId);

    Optional<Sentry> findById(UUID id);
}

