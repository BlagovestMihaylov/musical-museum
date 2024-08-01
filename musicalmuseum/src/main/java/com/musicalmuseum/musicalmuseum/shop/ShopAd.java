package com.musicalmuseum.musicalmuseum.shop;

import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@Document(collection = "shopAds")
public class ShopAd {
    @Id
    private String id;

    @DBRef
    private Exhibit exhibit; // Reference to Exhibit

    private Date datePosted;
    private double price;

    public ShopAd(String id, Exhibit exhibit, Date datePosted, double price) {
        this.id = id;
        this.exhibit = exhibit;
        this.datePosted = datePosted;
        this.price = price;
    }
}
