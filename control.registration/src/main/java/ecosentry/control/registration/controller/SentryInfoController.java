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
import ecosentry.control.registration.model.SensorType;
import ecosentry.control.registration.model.Sentry;
import ecosentry.control.registration.model.User;
import ecosentry.control.registration.repository.SensorRepository;
import ecosentry.control.registration.repository.SensorTypeRepository;
import ecosentry.control.registration.repository.SentryRepository;
import ecosentry.control.registration.repository.UserRepository;
import ecosentry.control.registration.service.TokenValidationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class SentryInfoController {
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


    @PostMapping("/get-user-info")
    public UserInfoResponse getUserInfo(@RequestBody String token) throws InterruptedException, ExecutionException, TimeoutException {
        String isValid = tokenService.validateToken(token);

        // Find user by email returned from token validation
        User user = userRepository.findByEmail(isValid);
        
        if (user == null) {
            // Handle the case where the user is not found, e.g., throw an exception or return an error message
            throw new RuntimeException("User not found with that email: " + isValid);
        }
        System.out.println("NAME " + user.getFName());

        UserInfoResponse userInfoResponse = new UserInfoResponse(user.getId(), user.getFName(), user.getLName(), user.getEmail());

        return userInfoResponse;
    }

    public static class UserInfoResponse{
        private Long id;
        private String fName;
        private String lName;
        private String email;

        public UserInfoResponse(Long id, String fName, String lName, String email){
            this.id = id;
            this.fName = fName;
            this.lName = lName;
            this.email = email;
        }

        public String getEmail(){
            return email;
        }
        public String getLName(){
            return lName;
        }
        public String getFName(){
            return fName;
        }
        public Long getId(){
            return id;
        }
    }







    @PostMapping("/get-user-sentries")
    public List<Sentry> getUserSentries(@RequestBody String token) throws InterruptedException, ExecutionException, TimeoutException {
        String isValid = tokenService.validateToken(token);

        // Find user by email returned from token validation
        User user = userRepository.findByEmail(isValid);
        
        if (user == null) {
            // Handle the case where the user is not found, e.g., throw an exception or return an error message
            throw new RuntimeException("User not found with that email: " + isValid);
        }
        
        return sentryRepository.findByUserId(user.getId());
    }
    







    public static class GetUserSentriesDTO{
        private String token;
        private UUID sentryId;

        GetUserSentriesDTO(String token, UUID sentryId){
            this.token = token;
            this.sentryId = sentryId;
        }

        public String getToken(){
            return token;
        }
        public UUID getSentryId(){
            return sentryId;
        }
    }

    @PostMapping("/get-sentry-sensors")
    public List<Sensor> getSentrySensors(@RequestBody GetUserSentriesDTO getUserSentriesDTO) throws InterruptedException, ExecutionException, TimeoutException {
        String isValid = tokenService.validateToken(getUserSentriesDTO.getToken());

        // Find user by email returned from token validation
        User user = userRepository.findByEmail(isValid);
        
        if (user == null) {
            // Handle the case where the user is not found, e.g., throw an exception or return an error message
            throw new RuntimeException("User not found with that email: " + isValid);
        }
        
        return sensorRepository.findBySentryId(getUserSentriesDTO.getSentryId());
    }

    @GetMapping("/get-sensor-types")
    public List<SensorType> getMethodName() {
        return sensorTypeRepository.findAll();
    }

    @PostMapping("/get-sensor-type-title")
    public String getSensorTypeTitle(@RequestBody SensorTypeIdRequest request) throws InterruptedException, ExecutionException, TimeoutException {
        UUID sensorTypeId = request.getSensorTypeId();
        Optional<SensorType> mySensorType = sensorTypeRepository.findById(sensorTypeId);
        if (mySensorType.isPresent()) {
            SensorType sensorType = mySensorType.get();
            return sensorType.getSensorType() + " (" + sensorType.getUnit() + ")";
        } else {
            throw new RuntimeException("Sensor not found with that ID: " + sensorTypeId);
        }
    }

    public static class SensorTypeIdRequest {
        private UUID sensorTypeId;
    
        public UUID getSensorTypeId() {
            return sensorTypeId;
        }
    
        public void setSensorTypeId(UUID sensorTypeId) {
            this.sensorTypeId = sensorTypeId;
        }
    }
    

        
}
