package ecosentry.control.registration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecosentry.control.registration.EcoNode.EcoNode;
import ecosentry.control.registration.EcoNode.NodeToken;

@RestController
@RequestMapping("/node")
public class RegistrationController {
    @Autowired RegistrationService regiService;

    @PostMapping("/register")
    String registerNode(@RequestBody EcoNode ecoNode){
        return regiService.registerNode(ecoNode);
    }
    @PostMapping("/control/addToken")
    boolean addNodeToken(@RequestBody NodeToken token){
        return regiService.addToken(token);
    }
}