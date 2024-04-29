package ecosentry.control.registration.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ecosentry.control.registration.model.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, UUID> {
    
}


