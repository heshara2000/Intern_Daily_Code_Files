package com.telusko.springcloud;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/")
    public String greet(){
        return "hello cloud" ;
    }
    @GetMapping("info")
    public String aboutMachine(){
        String os = System.getProperty("os.name");
        return "OS : + os  " +System.getProperty("os.version");
    }
}
