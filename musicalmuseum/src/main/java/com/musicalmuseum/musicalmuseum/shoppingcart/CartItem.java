package com.musicalmuseum.musicalmuseum.shoppingcart;


import com.musicalmuseum.musicalmuseum.jwt.entities.User;
import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import com.musicalmuseum.musicalmuseum.shop.ShopAd;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Data
@NoArgsConstructor
@Document(collection = "cart-items")
public class CartItem
{
    @Id
    private String id;

    @DBRef
    private ShopAd shopAd;

    @DBRef
    private User user;

    private Integer quantity;

    public CartItem(String id, ShopAd shopAd, User user, Integer quantity)
    {
        this.id = id;
        this.shopAd = shopAd;
        this.user = user;
        this.quantity = quantity;
    }
}
