package ecosentry.authproxy.messaging.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ecosentry.authproxy.messaging.producer.TokenValidationResponseSender;
import ecosentry.authproxy.security.JwtUtil;


@Component
public class TokenValidationRequestReceiver {

    @Autowired
    private TokenValidationResponseSender responseSender;

    @Autowired
    private JwtUtil jwtUtil;

    @KafkaListener(topics = "token-validation-requests")
    public void receiveTokenForValidation(String message) {
        System.out.println("Received message for validation: " + message);

        // Assume the message format is "correlationId:token"
        String[] parts = message.split(":", 2); // Use limit to ensure no more than 2 parts
        if (parts.length < 2) {
            // Log error or handle cases where message does not conform to expected format
            System.err.println("Invalid message format. Expected 'correlationId:token'. Received: " + message);
            return; // Early return to avoid proceeding with invalid data
        }

        String correlationId = parts[0];
        String token = parts[1];

        boolean isValid;
        String email = "null";
        try {
            isValid = jwtUtil.validateToken(token, jwtUtil.extractUsername(token));
            email = jwtUtil.extractUsername(token);
        } catch (Exception e) {
            isValid = false; // Token validation failed
            System.err.println("Token validation failed for message: " + message);
        }

        // Send back the validation result
        responseSender.sendValidationResult(correlationId, isValid, email);
    }
}

