package ecosentry.authproxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"ecosentry.authproxy"})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}