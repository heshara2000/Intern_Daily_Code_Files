package model;

import com.telusko.websecurity.AllArgsConstructor;
import com.telusko.websecurity.Data;
import com.telusko.websecurity.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Student {
    private int id;
    private String name;
    private String tech;


    public Student(int i, String user1, String java) {
    }

    public void add(Student student) {

    }
}
