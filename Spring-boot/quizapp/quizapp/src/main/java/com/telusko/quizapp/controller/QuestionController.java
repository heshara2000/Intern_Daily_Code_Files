package com.telusko.quizapp.controller;

import com.telusko.quizapp.model.Question;
import com.telusko.quizapp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {
    @Autowired
    QuestionService questionService;
    @GetMapping("/getquestion")
    public ResponseEntity<List<Question>> getQuestion() {

        return new ResponseEntity<>(questionService.getQuestion().getBody(), org.springframework.http.HttpStatus.OK);
    }

    @GetMapping("category/{category}")
    public List<Question> getQuestionByCategory(String category) {
        return questionService.getQuestions(category);
    }

    @PostMapping("add")
    public String addQuestion(@RequestBody Question question) {
        questionService.addQuestion(question);
        return "Question added successfully";
    }
}
