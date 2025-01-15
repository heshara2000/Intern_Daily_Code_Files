package Controller;

import com.telusko.websecurity.csrfToken;
import jakarta.servlet.http.HttpServletRequest;
import model.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

public class StudentController {
    List<Student> students = new ArrayList<>(List.of(
            new Student(1,"user1","java"),
            new Student(2,"user2","js")
    ));

    @GetMapping("csrf-token")
    public csrfToken getcsrfToken(HttpServletRequest request){
        return (csrfToken) request.getAttribute("_csrf");

    }

    @GetMapping("students")
    public List<Student> getStudents(){
        return students;
    }

    public void addStudent(@RequestBody Student student){
        student.add(student);
    }
}
