package com.telusko.SpringJDBCEx;

import com.telusko.SpringJDBCEx.model.Student;
import com.telusko.SpringJDBCEx.service.StudentService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;

@SpringBootApplication
public class SpringJdbcExApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(SpringJdbcExApplication.class, args);
		Student s = context.getBean(Student.class);
		s.setRollNo(101);
		s.setMarks(85);
		s.setName("heshara");

		StudentService service = context.getBean(StudentService.class);


		service.addStudent(s);   ///for this need to create service layer and repository layer

		List<Student> students = service.getStudent();
		System.out.println(students);


	}



}
