package ecosentry.dash.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import ecosentry.dash.misc.ColourCodes;

@RestController
@RequestMapping("/servicestatus")
public class ServiceStatusController {

    @Value("${ecosentry.main.ip}")
    private String serverIp;
    @Value("${ecosentry.control.port}")
    private String controlPort;
    @Value("${ecosentry.registration.port}")
    private String registrationPort;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public String getServiceStatus() {
        String[] serviceUrls = {
            "http://" + serverIp + ":8080/ping",
            "http://" + serverIp + ":" + controlPort + "/ping",
            "http://" + serverIp + ":" + registrationPort + "/ping"
            // Add more URLs as needed
        };

        StringBuilder combinedResponseBody = new StringBuilder();
        RestTemplate restTemplate = new RestTemplate(); // Ensure you have a RestTemplate instance

        for (String serviceUrl : serviceUrls) {
            try {
                ResponseEntity<String> response = restTemplate.getForEntity(serviceUrl, String.class);
                // Check if the response is OK and if so, append its body
                if (response.getStatusCode().is2xxSuccessful()) {
                    combinedResponseBody.append(response.getBody());
                } else {
                    combinedResponseBody.append(ColourCodes.RED + ColourCodes.BOLD + ColourCodes.UNDERLINE + "[♦Down]" + ColourCodes.RESET + ColourCodes.CYAN + " - ").append(serviceUrl).append("\n");
                }
            } catch (ResourceAccessException e) {
                combinedResponseBody.append(ColourCodes.RED + ColourCodes.BOLD + ColourCodes.UNDERLINE + "[♦Down]" + ColourCodes.RESET + ColourCodes.CYAN + " - ").append(serviceUrl).append("\n");
            } catch (Exception e) {
                // Handle other exceptions if necessary
                combinedResponseBody.append(ColourCodes.RED + ColourCodes.BOLD + ColourCodes.UNDERLINE + "[♦Error]" + ColourCodes.RESET + ColourCodes.CYAN + " - ").append(e.getMessage()).append("\n");
            }
        }

        return combinedResponseBody.toString();
    }
}