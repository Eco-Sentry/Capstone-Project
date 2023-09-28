package ecosentry.control.userservice.component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AddressFinderRunner implements CommandLineRunner {
    private final AddressFinder addressFinder;
    private final Logger logger = LoggerFactory.getLogger(AddressFinderRunner.class);

    public AddressFinderRunner(AddressFinder addressFinder) {
        this.addressFinder = addressFinder;
    }

    @Override
    public void run(String... args) {
        String serverAddress = addressFinder.getServerAddress();
        logger.info("Server Address: " + serverAddress);
    }
}
