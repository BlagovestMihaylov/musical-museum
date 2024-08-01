package com.musicalmuseum.musicalmuseum.shop;


import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/shopAds")
public class ShopAdController
{

    private final ShopAdService shopAdService;

    public ShopAdController(ShopAdService shopAdService)
    {
        this.shopAdService = shopAdService;
    }

    @GetMapping
    public ResponseEntity<List<ShopAd>> getAllShopAds()
    {
        List<ShopAd> shopAds = shopAdService.getAllShopAds();
        return ResponseEntity.ok(shopAds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShopAd> getShopAdById(@PathVariable("id") String id)
    {
        ShopAd shopAd = shopAdService.getShopAdById(id);
        return ResponseEntity.ok(shopAd);
    }

    @PostMapping
    public ResponseEntity<ShopAd> createShopAd(@RequestBody ShopAd shopAd)
    {
        shopAd.setDatePosted(new Date());
        ShopAd createdShopAd = shopAdService.createShopAd(shopAd.getId(), shopAd.getExhibit(), shopAd.getDatePosted(),
                                                          shopAd.getPrice());
        return ResponseEntity.ok(createdShopAd);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShopAd> updateShopAd(@PathVariable("id") String id, @RequestBody ShopAd shopAd)
    {
        ShopAd updatedShopAd = shopAdService.updateShopAd(id, shopAd.getExhibit(), shopAd.getDatePosted(),
                                                          shopAd.getPrice());
        return ResponseEntity.ok(updatedShopAd);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShopAd(@PathVariable("id") String id)
    {
        shopAdService.deleteShopAd(id);
        return ResponseEntity.noContent()
                             .build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ShopAd>> searchExhibits(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String period,
            @RequestParam(required = false) String instrumentType,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String technology) {

        List<ShopAd> ads = shopAdService.searchAdsByExhibitCriteria(name, period, instrumentType, region, genre, technology);
        return ResponseEntity.ok(ads);
    }
}

