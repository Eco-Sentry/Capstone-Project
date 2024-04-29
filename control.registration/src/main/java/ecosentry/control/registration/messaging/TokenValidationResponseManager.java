package ecosentry.control.registration.messaging;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CompletableFuture;

@Component
public class TokenValidationResponseManager {
    private final ConcurrentHashMap<String, CompletableFuture<String>> futures = new ConcurrentHashMap<>();

    public void addFuture(String correlationId, CompletableFuture<String> future) {
        futures.put(correlationId, future);
    }

    public void completeFuture(String correlationId, String validationResult) {
        CompletableFuture<String> future = futures.remove(correlationId);
        if (future != null) {
            future.complete(validationResult);
        }
    }
}
