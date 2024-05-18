package ecosentry.control.datalogger.controller;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Random;
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
import ecosentry.control.utilities.GeoUtils;

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

    

    // To Get readings

    // @GetMapping("/readings")
    // public List<SensorReadingResponse> getReadingsByTypeAndTime(
    //         @RequestParam UUID sensorType,
    //         @RequestParam Instant startTime,
    //         @RequestParam Instant endTime,
    //         @RequestParam double longitude,
    //         @RequestParam double latitude, 
    //         @RequestParam double range) {

    //     List<SensorReading> preRange = sensorReadingRepository.findBySensorTypeAndTime(sensorType, startTime, endTime);
    //     List<SensorReadingResponse> postRangeProcessed = new ArrayList<SensorReadingResponse>();

    //     for (SensorReading myReading : preRange){
    //         // isWithinRange(double lat1, double lon1, double lat2, double lon2, double rangeKm)
    //         boolean passRangeTest = GeoUtils.isWithinRange(myReading.getLatitude(),
    //                                                         myReading.getLongitude(),
    //                                                         latitude,
    //                                                         longitude,
    //                                                         range);
    //         if (passRangeTest){
    //             postRangeProcessed.add(new SensorReadingResponse(myReading.getReading(),
    //                                                                 myReading.getLongitude(),
    //                                                                 myReading.getLatitude(),
    //                                                                 myReading.getTrust(),
    //                                                                 myReading.getDateTime()));
    //         }
    //     }

    //     return postRangeProcessed;
    // }
    @GetMapping("/readings")
    public List<SensorReadingResponse> getReadingsByTypeAndTime(
            @RequestParam UUID sensorType,
            @RequestParam Instant startTime,
            @RequestParam Instant endTime,
            @RequestParam double longitude,
            @RequestParam double latitude, 
            @RequestParam double range) {

        List<SensorReading> preRange = sensorReadingRepository.findBySensorTypeAndTime(sensorType, startTime, endTime);
        List<SensorReadingResponse> postRangeProcessed = new ArrayList<>();

        for (SensorReading myReading : preRange) {
            boolean passRangeTest = GeoUtils.isWithinRange(myReading.getLatitude(),
                                                        myReading.getLongitude(),
                                                        latitude,
                                                        longitude,
                                                        range);
            if (passRangeTest) {
                postRangeProcessed.add(new SensorReadingResponse(myReading.getReading(),
                                                                myReading.getLongitude(),
                                                                myReading.getLatitude(),
                                                                myReading.getTrust(),
                                                                myReading.getDateTime()));
            }
        }

        // Perform reservoir sampling to select up to 10,000 items
        List<SensorReadingResponse> sampledList = new ArrayList<>();
        Random rand = new Random();
        int count = 0;

        for (SensorReadingResponse response : postRangeProcessed) {
            if (count < 10000) {
                sampledList.add(response);
            } else {
                int r = rand.nextInt(count + 1);
                if (r < 10000) {
                    sampledList.set(r, response);
                }
            }
            count++;
        }

        // Sort the sampled list by dateTime to maintain the original order
        sampledList.sort(Comparator.comparing(SensorReadingResponse::getDateTime));

        return sampledList;
    }



    
    public class SensorReadingResponse {
        private double reading;
        private double longitude, latitude;
        private double trust;
        private Instant dateTime;

        SensorReadingResponse(){}
        SensorReadingResponse(double reading, double longitude, double latitude, double trust, Instant dateTime){
            this.reading = reading;
            this.longitude = longitude;
            this.latitude = latitude;
            this.trust = trust;
            this.dateTime = dateTime;
        }

        public double getReading(){ return reading; }
        public double getLongitude(){ return longitude; }
        public double getLatitude(){ return latitude; }
        public double getTrust(){ return trust; }
        public Instant getDateTime() { return dateTime; }
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


    @GetMapping("/recent-reading")
    public SensorReadingResponse getMostRecentReadingTimeBySensorId(
            @RequestParam UUID sensorId, @RequestParam UUID sensorTypeId) {

        // Calculate the timestamp for "now minus ten minutes" in GMT/UTC
        Instant startTime = Instant.now().minus(10, ChronoUnit.MINUTES);
        Instant endTime = Instant.now();

        // Retrieve recent readings by sensor type within the last ten minutes
        List<SensorReading> recentReadings = sensorReadingRepository.findBySensorTypeAndTime(sensorTypeId, startTime, endTime);

        // Filter readings by sensorId
        List<SensorReading> filteredReadings = recentReadings.stream()
                .filter(reading -> sensorId.equals(reading.getSensorId()))
                .collect(Collectors.toList());

        if (filteredReadings.isEmpty()) {
            // Handle the case where no readings are found
            throw new RuntimeException("No sensor readings found");
        }

        // Get the most recent reading
        SensorReading mostRecentReading = filteredReadings.get(0);

        SensorReadingResponse sensorReadingResponse = new SensorReadingResponse(
                mostRecentReading.getReading(),
                mostRecentReading.getLongitude(),
                mostRecentReading.getLatitude(),
                mostRecentReading.getTrust(),
                mostRecentReading.getDateTime()
        );
        System.out.println("TESTING    " + sensorReadingResponse);
        return sensorReadingResponse;
    }


    
}

