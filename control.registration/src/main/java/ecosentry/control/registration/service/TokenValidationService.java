package ecosentry.control.registration.service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecosentry.control.registration.messaging.TokenValidationResponseManager;
import ecosentry.control.registration.messaging.producer.TokenValidationRequestSender;

@Service
public class TokenValidationService {

    @Autowired
    private TokenValidationRequestSender requestSender;

    @Autowired
    private TokenValidationResponseManager responseManager;

    public String validateToken(String token) throws InterruptedException, ExecutionException, TimeoutException {
        
        String correlationId = generateCorrelationId(); // Implement this method to generate a unique ID

        CompletableFuture<String> future = new CompletableFuture<>();
        responseManager.addFuture(correlationId, future);

        requestSender.sendTokenForValidation(token, correlationId);

        // Wait for the response, with a timeout to prevent hanging forever
        String isValid = future.get(10, TimeUnit.SECONDS); // Adjust timeout as needed

        return isValid;
    }

    private String generateCorrelationId() {
        // Generate a unique correlation ID
        return java.util.UUID.randomUUID().toString();
    }
}
