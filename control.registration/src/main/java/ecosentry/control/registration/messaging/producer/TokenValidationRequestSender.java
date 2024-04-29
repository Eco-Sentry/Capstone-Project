package ecosentry.control.registration.messaging.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenValidationRequestSender {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendTokenForValidation(String token, String correlationId) {
        kafkaTemplate.send("token-validation-requests", correlationId + ":" + token);
    }
}
