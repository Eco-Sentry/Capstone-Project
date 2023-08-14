package eco.sentry.central.domain.user;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserC {
    

    private final UserR userRepo;

    public UserC(UserR userRepo){
        this.userRepo = userRepo;
    }
    

}
