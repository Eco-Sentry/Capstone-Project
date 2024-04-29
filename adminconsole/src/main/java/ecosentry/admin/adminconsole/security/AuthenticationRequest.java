package ecosentry.admin.adminconsole.security;


public class AuthenticationRequest {

    private String email;    // Assuming the username is an email
    private String password;

    // Constructors
    public AuthenticationRequest() {
    }

    public AuthenticationRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
