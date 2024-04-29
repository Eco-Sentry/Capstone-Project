package ecosentry.control.registration.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ecosentry.control.registration.service.TokenValidationService;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

@RestController
@RequestMapping("/api")
public class TokenValidationController {

    @Autowired
    TokenValidationService tokenService;

    @PostMapping("/validate-token")
    public boolean validateToken(@RequestBody String token) throws InterruptedException, ExecutionException, TimeoutException {
        
        String isValid = tokenService.validateToken(token);

        boolean result = true;

        if (isValid.equals("null")){
            result = false;
        }
        System.out.println("YOO WTF: " + result);
        return true;
    }

}

