package ecosentry.control.registration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ecosentry.control.registration.model.Sentry;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);

		Sentry mySent = new Sentry();
		System.out.println(mySent.getId());
	}

	
}
