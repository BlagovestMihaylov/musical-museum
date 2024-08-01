package com.musicalmuseum.musicalmuseum.shop;

import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopAdRepository extends MongoRepository<ShopAd, String> {

     List<ShopAd> findAllByExhibit(Exhibit exhibit);
}

