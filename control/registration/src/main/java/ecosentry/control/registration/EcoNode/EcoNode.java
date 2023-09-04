package ecosentry.control.registration.EcoNode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EcoNode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    private String token;
    private String netAddress;

    EcoNode(){}
    public EcoNode(String token, String netAddress){
        this.token = token;
        this.netAddress = netAddress;
    }

    // Mutators
    public void setId(long id){
        this.id = id;
    }
    public void setToken(String token){
        this.token = token;
    }
    public void setNetAddress(String netAddress){
        this.netAddress = netAddress;
    }

    // Accessors
    public long getId(){
        return id;
    }
    public String getToken(){
        return token;
    }
    public String getNetAddress(){
        return netAddress;
    }
}
