// package ecosentry.admin.adminconsole.security;

// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.client.RestTemplate;

// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletResponse;

// @Controller
// public class AuthenticationController {

//     // Method to handle API login (JSON)
//     @PostMapping(path = "/api/login", consumes = "application/json")
//     public ResponseEntity<?> apiLogin(@RequestBody AuthenticationRequest authenticationRequest) {
//         System.out.println("API login attempt with email: " + authenticationRequest.getEmail());
//         RestTemplate restTemplate = new RestTemplate();
//         String url = "http://localhost:8086/loginService/login";
//         try {
//             String token = restTemplate.postForObject(url, authenticationRequest, String.class);
//             System.out.println("Token: " + token);
//             return ResponseEntity.ok("Token: " + token);
//         } catch (Exception e) {
//             System.out.println(e);
//             return ResponseEntity.badRequest().body("Login failed");
//         }
//     }

//     // Method to handle form submissions
//     @PostMapping("/login")
//     public String formLogin(@RequestParam("email") String email, @RequestParam("password") String password, Model model, HttpServletResponse response) {
//         System.out.println("Form login attempt with email: " + email);

//         RestTemplate restTemplate = new RestTemplate();
//         String url = "http://localhost:8086/loginService/login";
//         AuthenticationRequest authRequest = new AuthenticationRequest(email, password);

//         try {
//             String token = restTemplate.postForObject(url, authRequest, String.class);
//             System.out.println("Token: " + token);

//             JwtTokenFilter jwtTokenFilter = new JwtTokenFilter();
//             boolean isAuthenticated = jwtTokenFilter.validateToken(token);

//             if (isAuthenticated) {
//                 // Store the token in a cookie
//                 Cookie authCookie = new Cookie("AUTH-TOKEN", token);
//                 authCookie.setHttpOnly(true); // Enhance security by making the cookie inaccessible to JavaScript
//                 authCookie.setPath("/"); // Available to entire application
//                 response.addCookie(authCookie);

//                 model.addAttribute("email", email);
//                 return "dashboard";  // Redirect to home page on success
//             } else {
//                 model.addAttribute("error", "Invalid credentials");
//                 return "login";  // Stay on login page and display error
//             }
//         } catch (Exception e) {
//             System.out.println(e);
//             model.addAttribute("error", "Login failed due to an error: " + e.getMessage());
//             return "login";  // Stay on login page and display error
//         }
//     }

    

//     // Method to serve the login page
//     @GetMapping("/login")
//     public String loginPage() {
//         return "login";  // This will correctly serve your Thymeleaf template
//     }
//     // Method to serve the login page
//     @GetMapping("/dashboard")
//     public String dashboardPage() {
//         return "lashboard";  // This will correctly serve your Thymeleaf template
//     }
//     // Method to serve the login page
//     @GetMapping("/template")
//     public String templatePage() {
//         return "redirect:/dashboard";  // This will correctly serve your Thymeleaf template
//     }

// }
package ecosentry.admin.adminconsole.security;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class AuthenticationController {

    // Method to handle API login (JSON)
    @PostMapping(path = "/api/login", consumes = "application/json")
    public ResponseEntity<?> apiLogin(@RequestBody AuthenticationRequest authenticationRequest) {
        System.out.println("API login attempt with email: " + authenticationRequest.getEmail());
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8086/loginService/login";
        try {
            String token = restTemplate.postForObject(url, authenticationRequest, String.class);
            System.out.println("Token: " + token);
            return ResponseEntity.ok("Token: " + token);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body("Login failed");
        }
    }

    // Method to handle form submissions
    @PostMapping("/login-form")
    public String formLogin(@RequestParam("email") String email, @RequestParam("password") String password, Model model, HttpServletResponse response) {
        System.out.println("Form login attempt with email: " + email);
        System.out.println("Starting form login attempt");
        System.out.println("Email: " + email);
        System.out.println("Password: " + password);

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8086/loginService/login";
        AuthenticationRequest authRequest = new AuthenticationRequest(email, password);

        try {
            String token = restTemplate.postForObject(url, authRequest, String.class);
            System.out.println("Token: " + token);

            JwtTokenFilter jwtTokenFilter = new JwtTokenFilter();
            boolean isAuthenticated = jwtTokenFilter.validateToken(token);

            if (isAuthenticated) {
                // Store the token in a cookie
                Cookie authCookie = new Cookie("AUTH-TOKEN", token);
                authCookie.setHttpOnly(true); // Enhance security by making the cookie inaccessible to JavaScript
                authCookie.setPath("/"); // Available to entire application
                response.addCookie(authCookie);

                model.addAttribute("email", email);
                return "redirect:/dashboard"; // Redirect to home page on success
            } else {
                model.addAttribute("error", "Invalid credentials");
                return "redirect:/login";  // Stay on login page and display error
            }
        } catch (Exception e) {
            System.out.println(e);
            model.addAttribute("error", "Login failed due to an error: " + e.getMessage());
            return "redirect:/login";  // Stay on login page and display error
        }
    }

    

    // Method to serve the login page
    @GetMapping("/login")
    public String loginPage() {
        return "/login";  // This will correctly serve your Thymeleaf template
    }
    // Method to serve the login page
    @GetMapping("/dashboard")
    public String dashboardPage() {
        return "/dashboard";  // This will correctly serve your Thymeleaf template
    }
    // Method to serve the login page
    @GetMapping("/template")
    public String templatePage() {
        return "/template";  // This will correctly serve your Thymeleaf template
    }

}
