package ecosentry.control.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecosentry.control.registration.EcoNode.EcoNode;
import ecosentry.control.registration.EcoNode.EcoNodeRepo;
import ecosentry.control.registration.EcoNode.EcoNodeTokenRepo;
import ecosentry.control.registration.EcoNode.NodeToken;

@Service
public class RegistrationService {
    @Autowired private final EcoNodeRepo nodeRepo;
    @Autowired private final EcoNodeTokenRepo tokenRepo;

    RegistrationService(EcoNodeRepo nodeRepo, EcoNodeTokenRepo tokenRepo){
        this.nodeRepo = nodeRepo;
        this.tokenRepo = tokenRepo;
    }

    public boolean addToken(NodeToken token){
        return tokenRepo.save(token) != null;
    }






    public boolean nodeVerified(String token){
        NodeToken nodeToken = tokenRepo.findByToken(token);
        return nodeToken != null;
    }
    public String registerNode(EcoNode node){
        if (nodeVerified(node.getToken())){
            nodeRepo.save(node);
            return "NODE VERIFIED";
        }
        else{
            return "NODE FAILED TO VERIFY";
        }
    }
}
