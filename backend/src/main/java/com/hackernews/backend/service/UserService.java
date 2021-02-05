package com.hackernews.backend.service;

import com.hackernews.backend.model.User;
import com.hackernews.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService  {
    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepo.findById(username).get();
    }
}
