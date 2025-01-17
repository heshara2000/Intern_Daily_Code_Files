package com.telusko.student_app;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Scanner;

@RestController
public class StudentController {

    @RequestMapping("/getStudent")
    public List <Student> getStudent(){

        return repo.findAll();
        //return List.of(
//                new Student(1,"eeee",21),
//                new Student(2,"fff",99),
//                new Student(3,"gggg",44)
        );

    }
}
