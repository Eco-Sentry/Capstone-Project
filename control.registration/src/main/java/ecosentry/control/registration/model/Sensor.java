package ecosentry.control.registration.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Sensor {
    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "sentry_id", nullable = false)
    private Sentry sentry;

    @ManyToOne 
    @JoinColumn(name = "sensor_type_id")
    private SensorType sensorType;

    public Sensor(){
    }
    public Sensor(Sentry sentry, SensorType sensorType){
        this.sentry = sentry;
        this.sensorType = sensorType;
    }

    // Getters
    public UUID getId(){
        return id;
    }

    public Sentry getSentry(){
        return sentry;
    }
    public SensorType getSensorType(){
        return sensorType;
    }

    // Setters
    public void setSentry(Sentry sentry){
        this.sentry = sentry;
    }
    public void setSensorType(SensorType sensorType){
        this.sensorType = sensorType;
    }
}
