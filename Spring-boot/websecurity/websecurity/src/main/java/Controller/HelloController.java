package Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//import static sun.security.pkcs11.wrapper.Functions.getId;

@RestController
public class HelloController {
    @GetMapping("hello")
    public String greet(HttpServletRequest request){
        return "hello world";
    }



    @GetMapping("about")
    public String about(HttpServletRequest request){
        return "about me" + request.getSession().getId();
    }
}
