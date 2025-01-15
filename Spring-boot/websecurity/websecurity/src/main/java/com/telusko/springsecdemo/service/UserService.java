//package service;
//
//import model.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//    @Autowired
//    private UserRepo repo;
//    public User saveUser(User user){
//        return  user;
//    }
//}


package com.telusko.springsecdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.telusko.springsecdemo.dao.UserRepo;
import com.telusko.springsecdemo.model.User;

@Service
public class UserService {

    @Autowired
    private com.telusko.springsecdemo.service.UserRepo repo;
    private BCryptPasswordEncoder encoder =new BCryptPasswordEncoder(12);

    public com.telusko.springsecdemo.service.User saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        return repo.save(user) ;

    }

    public model.User saveUser(model.User user) {
        return null;
    }
}

