package ecosentry.authproxy.userRegistration;

public class UserRegistrationRequest {
    private String fName;
    private String lName;
    private String email;
    private String password;

    UserRegistrationRequest(String fName, String lName, String email, String password){
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getFName() {
        return fName;
    }

    public void setFName(String fName) {
        this.fName = fName;
    }

    public String getLName() {
        return lName;
    }

    public void setLName(String lName) {
        this.lName = lName;
    }

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
