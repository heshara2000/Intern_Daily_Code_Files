package com.telusko.student_app;

import com.fasterxml.jackson.annotation.JsonTypeId;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    public Student(int id, String name, int marks) {

        this.id = id;
        this.name = name;
        this.marks = marks;
    }

    private String name;

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int marks;

}
