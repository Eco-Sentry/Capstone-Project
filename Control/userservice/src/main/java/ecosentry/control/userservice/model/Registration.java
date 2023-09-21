package ecosentry.control.userservice.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "registrations")
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(unique = true, nullable = false)
    private UUID token;

    Registration(){
        this.token = UUID.randomUUID();
    }
    public Registration(User user){
        this.user = user;
        this.token = UUID.randomUUID();
    }

    // Mutators
    public void setId(Long id){
        this.id = id;
    }
    public void setUser(User user){
        this.user = user;
    }
    public void setToken(UUID token){
        this.token = token;
    }

    // Accessors
    public Long getId(){
        return id;
    }
    public User getUser(){
        return user;
    }
    public UUID getToken(){
        return token;
    }
}
