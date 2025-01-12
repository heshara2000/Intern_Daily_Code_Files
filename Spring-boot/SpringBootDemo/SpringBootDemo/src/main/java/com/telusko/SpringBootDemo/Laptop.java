package com.telusko.SpringBootDemo;

import org.springframework.stereotype.Component;

@Component
public class Laptop implements Comtuter {
    public Laptop(){
        System.out.println("laptop objet created");
    }
    @Override
    public void compile() {
        System.out.println("compiling....");
    }
}
