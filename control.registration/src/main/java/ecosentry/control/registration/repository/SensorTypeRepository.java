package ecosentry.control.registration.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.registration.model.SensorType;

public interface SensorTypeRepository extends JpaRepository<SensorType, UUID>{
    Optional<SensorType> findById(UUID id);
}
