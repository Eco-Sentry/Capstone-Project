package ecosentry.control.registration.model;

import java.util.UUID;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;

@Entity
public class SensorType {
    @Id
    private UUID id = UUID.randomUUID();
    private String sensorType, unit, description;
    private long popularity;
    private boolean activated = false; // This will be used in the future to change whether this sensor type exists when it has been checked and authorized

    public SensorType(){
    }
    public SensorType(String sensorType, String unit, String description) {
        this.sensorType = sensorType;
        this.unit = unit;
        this.description = description;
    }

     // Accessors
     public UUID getId(){
        return id;
    }
    public String getSensorType(){
        return sensorType;
    }
    public String getUnit(){
        return unit;
    }
    public String getDescription(){
        return description;
    }
    public long getPopularity(){
        return popularity;
    }
    public boolean getActivated(){
        return activated;
    }

    // Mutators
    public void setDescription(String description){
        this.description = description;
    }
    public void addPopularity(){
        popularity = popularity + 1;
    }
}
