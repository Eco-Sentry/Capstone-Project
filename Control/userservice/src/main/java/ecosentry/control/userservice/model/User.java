package ecosentry.control.userservice.model;

import ecosentry.control.userservice.coderesources.UserType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ecosentryuser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String fName;
    private String lName;
    private String email;
    private String phone;
    private UserType userType;

    User(){}
    public User(String fName, String lName, String email, String phone, UserType userType){
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.phone = phone;
        this.userType = userType;
    }

    // Accessors
    public Long getId(){
        return id;
    }
    public String getFName(){
        return fName;
    }
    public String getLName(){
        return lName;
    }
    public String getEmail(){
        return email;
    }
    public String getPhone(){
        return phone;
    }
    public UserType getUserType(){
        return userType;
    }

    // Mutators
    public void setFName(String fName){
        this.fName = fName;
    }
    public void setLName(String lName){
        this.lName = lName;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setPhone(String phone){
        this.phone = phone;
    }
    public void setUserType(UserType userType){
        this.userType = userType;
    }


}