package com.musicalmuseum.musicalmuseum.jwt.repo;

import com.musicalmuseum.musicalmuseum.jwt.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String>
{
    Optional<User> findByEmail(String email);
}
