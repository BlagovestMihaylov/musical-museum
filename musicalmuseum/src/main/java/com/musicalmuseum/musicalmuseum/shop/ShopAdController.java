package com.musicalmuseum.musicalmuseum.shop;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/shopAds")
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

