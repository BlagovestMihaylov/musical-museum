package com.musicalmuseum.musicalmuseum.jwt.services;

import com.musicalmuseum.musicalmuseum.jwt.dto.LoginUserDto;
import com.musicalmuseum.musicalmuseum.jwt.dto.RegisterUserDto;
import com.musicalmuseum.musicalmuseum.jwt.entities.Role;
import com.musicalmuseum.musicalmuseum.jwt.entities.User;
import com.musicalmuseum.musicalmuseum.jwt.repo.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class AuthenticationService
{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    )
    {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        var user = new User();
        user.setFullName(input.getFullName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRoles(Set.of(Role.USER));

        return userRepository.save(user);
    }


    public User authenticate(LoginUserDto input)
    {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                             .orElseThrow();
    }

    public List<User> allUsers()
    {

        return new ArrayList<>(userRepository.findAll());
    }
}