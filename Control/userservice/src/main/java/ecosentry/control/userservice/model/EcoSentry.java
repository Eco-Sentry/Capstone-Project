package ecosentry.control.userservice.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class EcoSentry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private UUID token;

    @OneToOne
    private User owner;

    private double longitude, latitude;

    EcoSentry(){}
    public EcoSentry(User owner){
        this.owner = owner;
        this.token = UUID.randomUUID();
    }

    // Accessors
    public Long getId(){
        return id;
    }
    public UUID getToken(){
        return token;
    }
    public User getUser(){
        return owner;
    }
    public double getLong(){
        return longitude;
    }
    public double getLat(){
        return latitude;
    }

    @Override
    public String toString(){
        return "EcoSentry: " + id 
            + "\nToken: " + token
            + "\nOwner: " + owner.getId()
            + "\nLocation: "
                + "\n-- Longitude: " + longitude
                + "\n--  Latitude: " + latitude;
    }
}

