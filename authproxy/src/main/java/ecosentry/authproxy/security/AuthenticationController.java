package ecosentry.authproxy.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import ecosentry.authproxy.models.User;
import ecosentry.authproxy.userRegistration.UserRegistrationRequest;

@RestController
public class AuthenticationController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/loginService/login")
    public String createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail());
        if (user != null && passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
            return jwtUtil.generateToken(user.getEmail());
        } else {
            throw new RuntimeException("User authentication failed"); // Use a more specific exception
        }
    }

    @GetMapping("/loginService/authorize")
    public boolean authorize(@RequestHeader("Authorization") String token) {
        String tokenWithoutBearer = token.substring(7); // Remove "Bearer " prefix
        try {
            return jwtUtil.validateToken(tokenWithoutBearer, jwtUtil.extractUsername(tokenWithoutBearer));
        } catch (Exception e) {
            return false; // Token validation failed
        }
    }

    

    @PostMapping("/loginService/createUser")
    public User createUser(@RequestBody UserRegistrationRequest registrationRequest) {
        // Check if user already exists
        if (userRepository.findByEmail(registrationRequest.getEmail()) != null) {
            throw new RuntimeException("User already exists");
        }

        // Encode the password
        String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());

        // Create new user and set properties
        User newUser = new User(registrationRequest.getFName(), registrationRequest.getLName(), 
                                registrationRequest.getEmail(), encodedPassword);

        // Save the user
        return userRepository.save(newUser);
    }
}
