package com.telusko.quizapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Entity
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String quiztitle;

    @ManyToMany
    private List<Question> questions;

    public void setTitle(String title) {
    }

    public void setQuestions(List<Question> questions) {
    }

    public List<Question> getQuestions() {
    }
}


