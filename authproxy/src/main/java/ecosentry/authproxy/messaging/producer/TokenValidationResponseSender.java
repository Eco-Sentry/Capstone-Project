package ecosentry.authproxy.messaging.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenValidationResponseSender {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendValidationResult(String correlationId, boolean isValid, String email) {
        String message = correlationId + ":" + isValid + ":" + email;
        kafkaTemplate.send("token-validation-responses", message);
    }
}
