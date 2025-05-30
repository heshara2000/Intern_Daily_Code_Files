package com.telusko.quizapp.dao;

import com.telusko.quizapp.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionDao extends JpaRepository<Question, Integer> {
    List<Question> findByCategory(String category);

    @Query(value = "Select * from Question q where q.category=:category ORDER BY RAND() LIMIT :numQ", nativeQuery = true)
    List<Question> findByCategory(String category, int numQ);

    List<Question> findRandomQuestionsByCategory(String category, int numQ);
}
