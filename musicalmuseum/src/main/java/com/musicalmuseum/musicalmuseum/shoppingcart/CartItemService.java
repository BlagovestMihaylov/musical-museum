package com.musicalmuseum.musicalmuseum.shoppingcart;

import com.musicalmuseum.musicalmuseum.jwt.entities.User;
import com.musicalmuseum.musicalmuseum.jwt.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService
{
    private final CartItemRepository cartItemRepository;
    private final UserService userService;

    public CartItemService(CartItemRepository cartItemRepository, UserService userService)
    {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
    }

    public CartItem createItem(final CartItem cartItem)
    {
        return cartItemRepository.save(cartItem);
    }

    public void removeItem(final String id)
    {
        cartItemRepository.deleteById(id);
    }

    public CartItem updateQuantity(final String id, final Integer quantity)
    {
        CartItem cartItem = cartItemRepository.findById(id)
                                              .orElse(null);

        assert cartItem != null;
        cartItem.setQuantity(quantity);

        return cartItem;
    }

    public List<CartItem> getItemsByUser(final String email)
    {
        final User user = userService.getByEmail(email);
        return cartItemRepository.findAllByUser(user);
    }
}
