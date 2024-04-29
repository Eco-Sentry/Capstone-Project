package ecosentry.control.datalogger.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import ecosentry.control.datalogger.model.SensorReading;
import ecosentry.control.datalogger.repository.SensorReadingRepository;

@RestController
@RequestMapping("/api")
public class SensorReadingController {
    @Autowired
    SensorReadingRepository sensorReadingRepository;

    @PostMapping("/send-data")
    public String sendData(@RequestBody SendReadingBody readingBody){

        // GET SENTRY INFORMATIO
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        // Correctly creating the HttpEntity with the UUID as the body
        HttpEntity<String> request = new HttpEntity<>(readingBody.getSentryId().toString(), headers);
        String sentryExists = restTemplate.postForObject("http://localhost:8082/api/check-sentry-registration", request, String.class);
        if (sentryExists.equals("Sensor not found")){
            return "Sensor not found";
        }
        String[] parts = sentryExists.split(":");

        // GET SENSOR INFORMATION
        HttpEntity<String> request2 = new HttpEntity<>(readingBody.getSensorId().toString(), headers);
        String sensorExists = restTemplate.postForObject("http://localhost:8082/api/check-sensor-registration", request2, String.class);
        if(sensorExists.equals("Sensor is not found")){
            return "Sensor is not found";
        }

        // (double reading, double longitude, double latitude, UUID sensorId, String sensorType, float trust)
        SensorReading newReading = new SensorReading(readingBody.getValue(), 
                                                        Double.parseDouble(parts[1]), 
                                                        Double.parseDouble(parts[2]), 
                                                        readingBody.getSensorId(), 
                                                        UUID.fromString(sensorExists),
                                                        Double.parseDouble(parts[3]));

        sensorReadingRepository.save(newReading);
        return newReading.toString();





        

    }

    // WIP

    @GetMapping("/readings")
    public List<SensorReading> getReadingsByTypeAndTime(
            @RequestParam UUID sensorType,
            @RequestParam Instant startTime,
            @RequestParam Instant endTime) {

        return sensorReadingRepository.findBySensorTypeAndTime(sensorType, startTime, endTime);
    }



    private static class SendReadingBody {
        
        private UUID sensorId, sentryId;
        double value;

        

        // Getters
        public UUID getSensorId(){
            return sensorId;
        }
        public UUID getSentryId(){
            return sentryId;
        }
        public double getValue(){
            return value;
        }
    }
}

