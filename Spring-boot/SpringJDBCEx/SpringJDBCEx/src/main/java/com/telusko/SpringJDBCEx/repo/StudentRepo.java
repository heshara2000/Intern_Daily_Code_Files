package com.telusko.SpringJDBCEx.repo;


import com.telusko.SpringJDBCEx.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class StudentRepo {

    private JdbcTemplate jdbc;

    public JdbcTemplate getJdbc() {
        return jdbc;
    }

    public void setJdbc(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void save(Student s) {

        String sql = "import into student (rollno,marks,name) values (?,?,?)";
        int rows = jdbc.update(sql,s.getRollNo(),s.getMarks(),s.getName());

        System.out.println(rows + "effected");
    }

    public List<Student> findAll() {
//        List<Student> students = new ArrayList<>();
//        return  students;
        String sql = "select * from student";
        RowMapper<Student> mapper = new RowMapper<Student>() {
            @Override
            public Student mapRow(ResultSet rs, int rowNum) throws SQLException {

                Student s = new Student();
                s.setRollNo(rs.getInt("rollno"));
                s.setName(rs.getString("name"));
                s.setName(rs.getInt("marks"));
                return s;
            }
        };
        return jdbc.query(sql,mapper);
    }
}
