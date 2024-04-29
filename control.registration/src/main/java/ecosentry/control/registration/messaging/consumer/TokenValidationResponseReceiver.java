package ecosentry.control.registration.messaging.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import ecosentry.control.registration.messaging.TokenValidationResponseManager;

@Component
public class TokenValidationResponseReceiver {

    @Autowired
    private TokenValidationResponseManager responseManager;

    @KafkaListener(topics = "token-validation-responses")
    public void receiveValidationResult(String message) {

        String[] parts = message.split(":");
        String correlationId = parts[0];
        boolean isValid = Boolean.parseBoolean(parts[1]);
        String email = parts[2];

        responseManager.completeFuture(correlationId, email);
    }
}


