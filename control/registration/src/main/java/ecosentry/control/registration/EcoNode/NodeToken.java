package ecosentry.control.registration.EcoNode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class NodeToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    private String token;
    private long institutionID;

    NodeToken(){}
    public NodeToken(String token, long institutionID){
        this.token = token;
        this.institutionID = institutionID;
    }

    // Mutators
    public void setId(long id){
        this.id = id;
    }
    public void setToken(String token){
        this.token = token;
    }
    public void setInstituteId(long institutionID){
        this.institutionID = institutionID;
    }

    // Accessors
    public long getId(){
        return id;
    }
    public String getToken(){
        return token;
    }
    public long getInstitute(){
        return institutionID;
    }
}
