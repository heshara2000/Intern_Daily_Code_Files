package Controller;

import model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.telusko.springsecdemo.service.UserService;

import javax.management.remote.JMXAuthenticator;

@RestController
public class UserController {

    @Autowired
    private UserService service;
    @PostMapping("register")
    public User register(@RequestBody User user){

        return service.saveUser(user);
    }

    @PostMapping("login")
    public CsrfToken login(@RequestBody User user, CookieCsrfTokenRepository jwtService) {
        JMXAuthenticator authenticationManager;
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername()));

        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else
            return "login failed";
    }
}
