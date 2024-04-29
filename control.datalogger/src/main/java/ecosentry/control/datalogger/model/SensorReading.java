// package ecosentry.control.datalogger.model;

// import java.util.UUID;

// import org.springframework.data.cassandra.core.mapping.PrimaryKey;
// import org.springframework.data.cassandra.core.mapping.Table;


// import java.time.ZonedDateTime;
// import java.time.ZoneId;
// import java.time.format.DateTimeFormatter;

// @Table
// public class SensorReading{
//     @PrimaryKey
//     private UUID id;

//     private double reading;

//     private double longitude, latitude;

//     private UUID sensorId;

//     // Id of the sensor type
//     private UUID sensorType;

//     // Value from 0.0 - 1.0 that represents how trustworthy this value is
//     private double trust;

//     private String dateTime;

//     public SensorReading(){
//         this.id = UUID.randomUUID();  // Automatically generate an ID if not provided

//         // Get current date and time in GMT
//         ZonedDateTime gmt = ZonedDateTime.now(ZoneId.of("GMT"));
//         System.out.println("Current Date and Time in GMT: " + gmt);
//         DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//         String formattedDateTime = gmt.format(formatter);

//         this.dateTime = formattedDateTime;
//     }
//     public SensorReading(double reading, double longitude, double latitude, UUID sensorId, UUID sensorType, double trust){
//         this();
//         this.reading = reading;
//         this.longitude = longitude;
//         this.latitude = latitude;
//         this.sensorId = sensorId;
//         this.sensorType = sensorType;
//         this.trust = trust;
//     }




//     // Accessors
//     public UUID getId(){
//         return id;
//     }
//     public double getLatitude(){
//         return latitude;
//     }
//     public double getLongitude(){
//         return longitude;
//     }
//     public UUID getSensor(){
//         return sensorId;
//     }
//     public UUID sensorType(){
//         return sensorType;
//     }
//     public double getTrust(){
//         return trust;
//     }
//     public double getReading(){
//         return reading;
//     }
//     public String getDateTime(){
//         return dateTime;
//     }
// }

package ecosentry.control.datalogger.model;

import java.util.UUID;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import java.time.ZonedDateTime;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Table
public class SensorReading {
    @PrimaryKey
    private UUID id;

    private double reading;
    private double longitude, latitude;
    private UUID sensorId;
    private UUID sensorType;
    private double trust;
    private Instant dateTime;

    // Constructors, getters, and setters
    public SensorReading() {
        this.id = UUID.randomUUID();  // Automatically generate an ID if not provided

        // Get current date and time in GMT
        ZonedDateTime gmt = ZonedDateTime.now(ZoneId.of("GMT"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        this.dateTime = gmt.toInstant();
    }

    public SensorReading(double reading, double longitude, double latitude, UUID sensorId, UUID sensorType, double trust) {
        this();
        this.reading = reading;
        this.longitude = longitude;
        this.latitude = latitude;
        this.sensorId = sensorId;
        this.sensorType = sensorType;
        this.trust = trust;
    }

    // Accessors and mutators
    public UUID getId() {
        return id;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public UUID getSensorId() {
        return sensorId;
    }

    public UUID getSensorType() {
        return sensorType;
    }

    public double getTrust() {
        return trust;
    }

    public double getReading() {
        return reading;
    }

    public Instant getDateTime() {
        return dateTime;
    }
}


