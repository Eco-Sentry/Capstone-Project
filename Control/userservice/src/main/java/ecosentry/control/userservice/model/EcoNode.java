package ecosentry.control.userservice.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class EcoNode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private UUID token;

    @OneToOne
    private EcoGroup group;

    private String address;

    EcoNode(){}
    public EcoNode(EcoGroup group){
        this.group = group;
        this.token = UUID.randomUUID();
    }
}
