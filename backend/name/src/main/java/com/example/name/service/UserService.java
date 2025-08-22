package com.example.name.service;

import com.example.name.model.User;
import com.example.name.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean validUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get().getPassword().equals(password);  // Compare passwords
        }
        return false;  // Username doesn't exist or password doesn't match
    }
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}
