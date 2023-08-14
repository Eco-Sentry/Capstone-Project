package eco.sentry.central.domain.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "custom_user")
public class User {
    
    @Id
    @GeneratedValue
    long userId;

    // 1-General User, 2-Admin, 3-Product Owner
    int accountLevel;

    String email, fName, lName, phone;

    public User(String email, String fName, String lName, String phone){
        accountLevel = 1;
        this.email = email;
        this.fName = fName;
        this. lName = lName;
        this.phone = phone;
    }

    // Mutators
    public void setAccountLevel(int accountLevel){
        this.accountLevel = accountLevel;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setFName(String fName){
        this.fName = fName;
    }
    public void setLName(String lName){
        this.lName = lName;
    }
    public void setPhone(String phone){
        this.phone = phone;
    }


    // Accessors
    public int getAccountLevel(){
        return accountLevel;
    }
    public String getEmail(){
        return email;
    }
    public String getFName(){
        return fName;
    }
    public String getLName(){
        return lName;
    }
    public String getPhone(){
        return phone;
    }
}
