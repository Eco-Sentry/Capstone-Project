package ecosentry.control.userservice.model;

import ecosentry.control.userservice.coderesources.RoleType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity 
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @OneToOne
    private User user;

    private RoleType role = RoleType.STANDARD;

    Role(){}
    public Role(User user){
        this.user = user;
    }

    public void setUser(User user){
        this.user = user;
    }
    public void setRole(RoleType role){
        this.role = role;
    }

    public User getUser(){
        return user;
    }
    public RoleType getRole(){
        return role;
    }
}
