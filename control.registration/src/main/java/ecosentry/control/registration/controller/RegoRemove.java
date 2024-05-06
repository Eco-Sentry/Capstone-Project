package ecosentry.control.registration.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecosentry.control.registration.model.Sensor;
import ecosentry.control.registration.model.Sentry;
import ecosentry.control.registration.model.User;
import ecosentry.control.registration.repository.SensorRepository;
import ecosentry.control.registration.repository.SensorTypeRepository;
import ecosentry.control.registration.repository.SentryRepository;
import ecosentry.control.registration.repository.UserRepository;
import ecosentry.control.registration.service.TokenValidationService;

@RestController
@RequestMapping("/api")
public class RegoRemove {
    
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


    @PostMapping("/delete-sentry")
    public void deleteSentry(@RequestBody DeletionDTO deletionDTO) throws InterruptedException, ExecutionException, TimeoutException {
        String isValid = tokenService.validateToken(deletionDTO.getToken());
        User user = userRepository.findByEmail(isValid);
        
        if (user == null) {
            throw new RuntimeException("User not found with that email: " + isValid);
        }

        Optional<Sentry> optionalSentry = sentryRepository.findById(deletionDTO.getObjId());
        if (optionalSentry.isPresent()) {
            Sentry sentry = optionalSentry.get();
            sentry.setUser(null); // Set user to null to disassociate
            sentryRepository.save(sentry); // Persist changes
        } else {
            throw new RuntimeException("Sentry not found with that ID: " + deletionDTO.getObjId());
        }
    }





    @PostMapping("/delete-sensor")
    public void deleteSensor(@RequestBody DeletionDTO deletionDTO) throws InterruptedException, ExecutionException, TimeoutException {
        String isValid = tokenService.validateToken(deletionDTO.getToken());
        User user = userRepository.findByEmail(isValid);
        
        if (user == null) {
            throw new RuntimeException("User not found with that email: " + isValid);
        }

        Optional<Sensor> optionalSensor = sensorRepository.findById(deletionDTO.getObjId());
        if (optionalSensor.isPresent()) {
            Sensor sensor = optionalSensor.get();
            sensor.setSentry(null); // Set Sentry to null to disassociate
            sensorRepository.save(sensor); // Persist changes
        } else {
            throw new RuntimeException("Sensor not found with that ID: " + deletionDTO.getObjId());
        }
    }



    public static class DeletionDTO {
        private String token;
        private UUID objId;
    
        public DeletionDTO(String token, UUID objId) {
            this.token = token;
            this.objId = objId;
        }
    
        // Getters
        public String getToken() {
            return token;
        }
    
        public UUID getObjId() {
            return objId;
        }
    
        // Setters, if needed
    }
}
