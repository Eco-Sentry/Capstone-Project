package ecosentry.control.registration.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fName;
    private String lName;
    private String email;
    private String password;

    public User(){}; // Make sure the no-arg constructor is at least protected for JPA

    // Update constructor to include password
    public User(String fName, String lName, String email, String password){
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password; // Store password, but it should be encoded
    }

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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