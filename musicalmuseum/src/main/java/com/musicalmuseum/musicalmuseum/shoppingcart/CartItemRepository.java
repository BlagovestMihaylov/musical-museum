package com.musicalmuseum.musicalmuseum.shoppingcart;


import com.musicalmuseum.musicalmuseum.jwt.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends MongoRepository<CartItem, String>
{
    List<CartItem> findAllByUser(User user);
}
