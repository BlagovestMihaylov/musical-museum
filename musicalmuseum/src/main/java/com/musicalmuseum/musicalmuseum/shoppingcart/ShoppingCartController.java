package com.musicalmuseum.musicalmuseum.shoppingcart;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer/cart")
public class ShoppingCartController
{
    private final CartItemService cartItemService;

    public ShoppingCartController(CartItemService cartItemService)
    {
        this.cartItemService = cartItemService;
    }

    @PostMapping
    public ResponseEntity<CartItem> addItem(@RequestBody CartItem cartItem)
    {
        CartItem created = cartItemService.createItem(cartItem);

        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateQuantity(@PathVariable("id") String id,
                                                   @RequestParam(name = "quantity") Integer quantity)
    {
        CartItem updated = cartItemService.updateQuantity(id, quantity);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable("id") String id)
    {
        cartItemService.removeItem(id);
    }

    @GetMapping("/user")
    public ResponseEntity<List<CartItem>> getUserItems(@RequestParam String email)
    {
        final List<CartItem> items = cartItemService.getItemsByUser(email);

        return ResponseEntity.ok(items);
    }
}
