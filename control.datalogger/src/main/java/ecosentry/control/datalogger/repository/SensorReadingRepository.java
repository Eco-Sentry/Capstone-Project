// package ecosentry.control.datalogger.repository;

// import java.util.Date;
// import java.util.List;
// import java.util.UUID;

// import org.springframework.data.cassandra.repository.CassandraRepository;
// import org.springframework.data.cassandra.repository.Query;

// import ecosentry.control.datalogger.model.SensorReading;

// // public interface SensorReadingRepository extends CassandraRepository<SensorReading, UUID> {
// //     @Query("SELECT * FROM sensorreading WHERE sensorType = ?0 AND latitude >= ?1 AND latitude <= ?2 AND longitude >= ?3 AND longitude <= ?4 AND dateTime >= ?5 AND dateTime <= ?6")
// //     List<SensorReading> findBySensorTypeAndLocationAndTime(UUID sensorType, double minLat, double maxLat, double minLong, double maxLong, ZonedDateTime startTime, ZonedDateTime endTime);
// // }

// public interface SensorReadingRepository extends CassandraRepository<SensorReading, UUID> {
//     @Query("SELECT * FROM sensor_readings WHERE sensorType = ?0 AND dateTime >= ?1 AND dateTime <= ?2")
//     List<SensorReading> findBySensorTypeAndTime(UUID sensorType, Date startTime, Date endTime);
// }



package ecosentry.control.datalogger.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import ecosentry.control.datalogger.model.SensorReading;

public interface SensorReadingRepository extends CassandraRepository<SensorReading, UUID> {
    @Query("SELECT * FROM sensorreading datetime >= ? ORDER BY datetime DESC ALLOW FILTERING")
    List<SensorReading> findRecentBySensorId(UUID sensorType, Instant cutoffDateTime);


    @Query("SELECT * FROM sensorreading WHERE sensorType = ?0 AND dateTime >= ?1 AND dateTime <= ?2")
    List<SensorReading> findBySensorTypeAndTime(UUID sensorType, Instant startTime, Instant endTime);
}
