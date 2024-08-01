package com.musicalmuseum.musicalmuseum.shop;


import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import com.musicalmuseum.musicalmuseum.museum.data.service.ExhibitService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ShopAdService
{

    private final ShopAdRepository shopAdRepository;
    private final ExhibitService exhibitService;

    public ShopAdService(ShopAdRepository shopAdRepository,
                         ExhibitService exhibitService)
    {
        this.shopAdRepository = shopAdRepository;
        this.exhibitService = exhibitService;
    }

    public List<ShopAd> getAllShopAds()
    {
        return shopAdRepository.findAll();
    }

    public List<ShopAd> searchAdsByExhibitCriteria(String name, String period,
                                                   String instrumentType, String region,
                                                   String genre, String technology)
    {
        final List<Exhibit> exhibits = exhibitService.searchExhibits(name, period, instrumentType, region, genre,
                                                                     technology);

        System.out.printf("found %d exhibits%n", exhibits.size());

        List<ShopAd> list = exhibits
                .stream()
                .map(shopAdRepository::findAllByExhibit)
                .flatMap(List::stream)
                .toList();
        System.out.println(list);
        return list;
    }

    public ShopAd getShopAdById(String id)
    {
        return shopAdRepository.findById(id)
                               .orElse(null);
    }

    public ShopAd createShopAd(String id, Exhibit exhibit, Date datePosted, double price)
    {
        ShopAd shopAd = new ShopAd(id, exhibit, datePosted, price);
        return shopAdRepository.save(shopAd);
    }

    public ShopAd updateShopAd(String id, Exhibit exhibit, Date datePosted, double price)
    {
        ShopAd shopAd = shopAdRepository.findById(id)
                                        .orElse(null);
        if (shopAd != null)
        {
            shopAd.setExhibit(exhibit);
            shopAd.setDatePosted(datePosted);
            shopAd.setPrice(price);
            return shopAdRepository.save(shopAd);
        }
        return null;
    }

    public void deleteShopAd(String id)
    {
        shopAdRepository.deleteById(id);
    }
}

