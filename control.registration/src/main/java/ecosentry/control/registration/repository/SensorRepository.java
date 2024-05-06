package ecosentry.control.registration.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.registration.model.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, UUID> {
    List<Sensor> findBySentryId(UUID sentryId);

    Optional<Sensor> findById(UUID id);
}


