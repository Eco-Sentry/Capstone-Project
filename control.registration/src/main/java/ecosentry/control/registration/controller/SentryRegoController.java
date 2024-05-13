package ecosentry.control.registration.controller;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import ch.qos.logback.core.joran.spi.NoAutoStart;
import ecosentry.control.registration.model.Sensor;
import ecosentry.control.registration.model.SensorType;
import ecosentry.control.registration.model.Sentry;
import ecosentry.control.registration.model.User;
import ecosentry.control.registration.repository.SensorRepository;
import ecosentry.control.registration.repository.SensorTypeRepository;
import ecosentry.control.registration.repository.SentryRepository;
import ecosentry.control.registration.repository.UserRepository;
import ecosentry.control.registration.service.TokenValidationService;

@RestController
@RequestMapping("/api")
public class SentryRegoController {

    @Autowired
    TokenValidationService tokenService;

    @Autowired
    SensorRepository sensorRepository;

    @Autowired
    SentryRepository sentryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SensorTypeRepository sensorTypeRepository;

    @PostMapping("/register-sentry")
    public String registerSentry(@RequestBody SentryRegoBody sentryRegoBody) throws InterruptedException, ExecutionException, TimeoutException {

        // Check token before proceeding to create Sentry
        String token = sentryRegoBody.getUserToken();
        String isValid = tokenService.validateToken(token);

        // Find user by email returned from token validation
        User user = userRepository.findByEmail(isValid);
        if (user == null) {
            // Handle the case where the user is not found, e.g., throw an exception or return an error message
            throw new RuntimeException("User not found with email: " + isValid);
        }

        // Proceed with creating the Sentry
        Sentry newSentry = new Sentry(user, sentryRegoBody.getLongitude(), sentryRegoBody.getLatitude());
        sentryRepository.save(newSentry);

        return newSentry.getId().toString();
    }

    @PostMapping("/register-sensor")
    public String registerSensor(@RequestBody SensorRegoBody sensorRegoBody) throws InterruptedException, ExecutionException, TimeoutException {

        // Check token before proceeding to create Sentry
        String token = sensorRegoBody.getUserToken();
        String isValid = tokenService.validateToken(token);

        // Find user by email returned from token validation
        User user = userRepository.findByEmail(isValid);
        if (user == null) {
            // Handle the case where the user is not found, e.g., throw an exception or return an error message
            throw new RuntimeException("User not found with email: " + isValid);
        }

        // Check if sentry actually exists first
        Optional<Sentry> sentryOptional = sentryRepository.findById(sensorRegoBody.getSentryId());
        if (!sentryOptional.isPresent()) {
            return "Sentry not found";
        }

        // Check if sentry type exists
        Optional<SensorType> sensorTypeOptional = sensorTypeRepository.findById(sensorRegoBody.getSensorTypeId());
        if(!sensorTypeOptional.isPresent()){
            return "Sensor not found";
        }

        Sentry sentry = sentryOptional.get();
        SensorType sensorType = sensorTypeOptional.get();
  

        // Proceed with creating the Sentry
        Sensor newSensor = new Sensor(sentry, sensorType);
        sensorRepository.save(newSensor);

        return newSensor.getId().toString();
    }

    @PostMapping("/propose-sensor-type")
    public String proposeSensorType(@RequestBody ProposeSensorType sensorTypeRegoBody) throws InterruptedException, ExecutionException, TimeoutException {

        // Check token before proceeding to create Sentry
        String token = sensorTypeRegoBody.getUserToken();
        String isValid = tokenService.validateToken(token);

        // Find user by email returned from token validation
        User user = userRepository.findByEmail(isValid);
        if (user == null) {
            // Handle the case where the user is not found, e.g., throw an exception or return an error message
            throw new RuntimeException("User not found with email: " + isValid);
        }

        SensorType newSensorType = new SensorType(sensorTypeRegoBody.getSensorType(), sensorTypeRegoBody.getUnit(), sensorTypeRegoBody.getDescription());
        sensorTypeRepository.save(newSensorType);

        return newSensorType.getId().toString();
    }



    @PostMapping("/check-sentry-registration")
    public String validateSentry(@RequestBody String tokenId) {
        UUID token;
        try {
            token = UUID.fromString(tokenId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid UUID format", e);
        }
        
        Optional<Sentry> sentryOptional = sentryRepository.findById(token);

        if (!sentryOptional.isPresent()) {
            return "Sentry not found";
        }

        // Sentry is confirmed to be present here
        Sentry sentry = sentryOptional.get();  // Get the Sentry instance safely after isPresent check
        String result = "true" + ":" + sentry.getLongitude() + ":" + sentry.getLatitude() + ":" + sentry.getTrust();
        return result;
    }


    @PostMapping("/check-sensor-registration")
    public String validateSensor(@RequestBody String tokenId) {
        UUID token;
        try {
            token = UUID.fromString(tokenId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid UUID format", e);
        }
        
        Optional<Sensor> sensorOptional = sensorRepository.findById(token);

        if (!sensorOptional.isPresent()){
            return "Sensor is not found";
        }

        Sensor sensor = sensorOptional.get();
        SensorType sensorType = sensor.getSensorType();
        sensorType.addPopularity();
        sensorTypeRepository.save(sensorType);

        return sensor.getSensorType().getId().toString();
    }








    private static class SentryRegoBody{
        private String userToken;
        private double longitude, latitude;

        SentryRegoBody(String userToken, double longitude, double latitude){
            this.userToken = userToken;
            this.longitude = longitude;
            this.latitude = latitude;
        }

        // Getters
        public String getUserToken(){
            return userToken;
        }
        public double getLongitude(){
            return longitude;
        }
        public double getLatitude(){
            return latitude;
        }
    }

    private static class SensorRegoBody{
        private String userToken;
        private UUID sensorTypeId;
        private UUID sentryId;

        // Getters
        public String getUserToken(){
            return userToken;
        }
        public UUID getSentryId(){
            return sentryId;
        }
        public UUID getSensorTypeId(){
            return sensorTypeId;
        }

    }

    private static class ProposeSensorType{
        private String userToken;
        private String unit;
        private String description;
        private String sensorType;

        public String getUserToken(){
            return userToken;
        }
        public String getUnit(){
            return unit;
        }
        public String getDescription(){
            return description;
        }
        public String getSensorType(){
            return sensorType;
        }
    }
}
