package com.musicalmuseum.musicalmuseum.jwt.services;

import com.musicalmuseum.musicalmuseum.jwt.entities.User;
import com.musicalmuseum.musicalmuseum.jwt.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService
{
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public List<User> allUsers()
    {
        return new ArrayList<>(userRepository.findAll());
    }
}