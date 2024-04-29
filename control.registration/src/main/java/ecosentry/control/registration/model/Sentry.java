package ecosentry.control.registration.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Sentry {
    @Id
    private UUID id = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double longitude, latitude, trust;


    public Sentry() {
    }
    public Sentry(User user, double longitude, double latidude){
        this.user = user;
        this.longitude = longitude;
        this.latitude = latidude;
    }

    // Getters
    public UUID getId() {
        return id;
    }
    public double getTrust(){
        return trust;
    }

    public User getUser() {
        return user;
    }
    public double getLongitude(){
        return longitude;
    }
    public double getLatitude(){
        return latitude;
    }

    // Setters
    public void setUser(User user) {
        this.user = user;
    }
    public void setLongitude(double longitude){
        this.longitude = longitude;
    }
    public void setLatitude(double latitude){
        this.latitude = latitude;
    }
    public void setTrust(double trust){
        this.trust = trust;
    }
}
