package com.telusko.SpringBootDemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SpringBootDemoApplication {

	public static <LaptopService> void main(String[] args) {
		ApplicationContext context =  SpringApplication.run(SpringBootDemoApplication.class, args);
		//System.out.println("hello world");

		LaptopService service = context.getBean(LaptopService.class);

		Laptop lap = context.getBean(Laptop.class);
		service.addLaptop(lap);
//		Allien obj = context.getBean(Allien.class);
//		obj.code();

//		Alien obj1 = context.getBean(Alien.class);
//		obj1.code();
	}

}
