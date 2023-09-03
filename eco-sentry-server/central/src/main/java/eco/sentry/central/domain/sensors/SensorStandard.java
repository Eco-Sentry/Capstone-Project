package eco.sentry.central.domain.sensors;


import java.time.Instant;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class SensorStandard {
    @Id
    @GeneratedValue
    long id;

    private Instant startDateTime;
    float longitude, latitude;

    public SensorStandard(float longitude, float latitude){
        startDateTime = Instant.now();

        this.longitude = longitude;
        this.latitude = latitude;
    }

    // Accessors
    public Instant getDateTime(){
        return startDateTime;
    }
    public float getLongitude(){
        return longitude;
    }
    public float getLatitude(){
        return latitude;
    }
    public long getId(){
        return id;
    }
}


