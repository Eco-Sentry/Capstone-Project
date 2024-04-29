package ecosentry.dash.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ecosentry.dash.misc.ColourCodes;

@RestController
@RequestMapping("/ping")
public class PingController {

    @GetMapping
    public String ping() {
        return ColourCodes.GREEN + ColourCodes.BOLD + ColourCodes.UNDERLINE + "[♦Active]" + ColourCodes.RESET + ColourCodes.CYAN + " - Dashboard\n";
    }
}