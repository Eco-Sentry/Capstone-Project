package ecosentry.dash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class DashApplication {

	public static void main(String[] args) {
		SpringApplication.run(DashApplication.class, args);
	}

	@Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
