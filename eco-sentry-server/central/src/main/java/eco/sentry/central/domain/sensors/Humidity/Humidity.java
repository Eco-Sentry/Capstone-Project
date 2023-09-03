package eco.sentry.central.domain.sensors.Humidity;

import eco.sentry.central.domain.sensors.SensorStandard;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Humidity extends SensorStandard{
    @Id
    @GeneratedValue
    long id;
    
    float humidityReading;

    public Humidity(float longitude, float latitude, float humidityReading) {
        super(longitude, latitude);
        this.humidityReading = humidityReading;
    }
    
}
