package com.telusko.SpringBootDemo;

import com.telusko.SpringBootDemo.config.AppConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.awt.*;

public class App {
    public static void main(String[] args) {
        //java based config
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Desktop dt = context.getBean(Desktop.class);
        dt.compile();



//        ApplicationContext context =  new ClassPathXmlApplicationContext("Context.xml");
//        //System.out.println("hello world");
//        Allien obj = (Allien) context.getBean("alien");
//        obj.code();

    }
}
