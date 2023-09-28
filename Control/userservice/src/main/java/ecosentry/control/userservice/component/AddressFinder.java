package ecosentry.control.userservice.component;

import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.stereotype.Component;

@Component
public class AddressFinder {
    private final ServerProperties serverProperties;

    public AddressFinder(ServerProperties serverProperties) {
        this.serverProperties = serverProperties;
    }

    public String getServerAddress() {
        String ipAddress = serverProperties.getAddress().getHostAddress();
        int port = serverProperties.getPort();
        return "http://" + ipAddress + ":" + port;
        
    }
}
