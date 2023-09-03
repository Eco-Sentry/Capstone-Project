package eco.sentry.central.domain.user;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserC {
    
    private final UserR userRepo;


    public UserC(UserR userRepo){
        this.userRepo = userRepo;
    }

    // Use Case: Get all the contacts
    @GetMapping("/dataRequest/users")
    List<User> all(){
        return userRepo.findAll();
    }
    

}
