package ecosentry.admin.adminconsole.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageRequestController {
    @GetMapping("/login")
    public String loginPage() {
        return "login";  // This will correctly serve your Thymeleaf template
    }
    // Method to serve the login page
    @GetMapping("/dashboard")
    public String dashboardPage() {
        return "dashboard";  // This will correctly serve your Thymeleaf template
    }
    // Method to serve the login page
    @GetMapping("/template")
    public String templatePage() {
        return "template";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/mySentries")
    public String mySentriesPage() {
        return "mySentries";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/sentryInfo")
    public String sentryInfoPage() {
        return "sentryInfo";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/sensorInfo")
    public String sensorInfoPage() {
        return "sensorInfo";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/createSentry")
    public String createSentryPage() {
        return "createSentry";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/about")
    public String aboutPage() {
        return "about";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/home")
    public String homePage() {
        return "home";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/profile")
    public String profilePage() {
        return "profile";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/guide")
    public String guidePage() {
        return "guide";  // This will correctly serve your Thymeleaf template
    }
    @GetMapping("/proposeSensor")
    public String proposeSensorPage() {
        return "proposeSensor";  // This will correctly serve your Thymeleaf template
    }
}
