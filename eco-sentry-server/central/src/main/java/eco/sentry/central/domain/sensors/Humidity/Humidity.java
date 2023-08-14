package eco.sentry.central.domain.sensors.Humidity;

import eco.sentry.central.domain.sensors.SensorStandard;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Humidity extends SensorStandard{
    float humidityReading;

    public Humidity(float longitude, float latitude, float humidityReading) {
        super(longitude, latitude);
        this.humidityReading = humidityReading;
    }
    
}
