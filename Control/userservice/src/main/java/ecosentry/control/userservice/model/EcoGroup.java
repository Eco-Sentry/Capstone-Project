package ecosentry.control.userservice.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class EcoGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;

    @OneToOne
    private User groupLead;

    @OneToMany
    private List<Role> members;

    @OneToMany
    private List<EcoNode> nodes;

    EcoGroup(){}
    public EcoGroup(User groupLead){
        this.groupLead = groupLead;
    }

    public Long getId(){
        return id;
    }
    public String getName(){
        return groupName;
    }
    public User getLeader(){
        return groupLead;
    }
    public List<Role> getMembers(){
        return members;
    }
    public List<EcoNode> getNodes(){
        return nodes;
    }

    public void setName(String groupName){
        this.groupName = groupName;
    }
}
