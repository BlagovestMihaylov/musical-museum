package com.musicalmuseum.musicalmuseum.admin;

import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import com.musicalmuseum.musicalmuseum.museum.data.service.ExhibitService;
import com.musicalmuseum.musicalmuseum.shop.ShopAd;
import com.musicalmuseum.musicalmuseum.shop.ShopAdService;
import org.springframework.stereotype.Service;

@Service
public class AdminService
{
    private final ShopAdService shopAdService;
    private final ExhibitService exhibitService;

    public AdminService(ShopAdService shopAdService, ExhibitService exhibitService)
    {
        this.shopAdService = shopAdService;
        this.exhibitService = exhibitService;
    }

    public ShopAd createShopAd(final ShopAd shopAd)
    {
        return shopAdService.createShopAd(shopAd.getId(), shopAd.getExhibit(), shopAd.getDatePosted(),
                                          shopAd.getPrice());
    }

    public ShopAd updateShopAd(final String id, final ShopAd shopAd)
    {
        return shopAdService.updateShopAd(id, shopAd.getExhibit(), shopAd.getDatePosted(),
                                          shopAd.getPrice());
    }

    public void deleteShopAd(final String id)
    {
        shopAdService.deleteShopAd(id);
    }

    public Exhibit createExhibit(final Exhibit exhibit)
    {
        return exhibitService.createExhibit(exhibit.getId(),
                                            exhibit.getName(),
                                            exhibit.getDescription(),
                                            exhibit.getImageUrl(),
                                            exhibit.getPeriod(),
                                            exhibit.getInstrumentType(),
                                            exhibit.getRegion(),
                                            exhibit.getGenre(),
                                            exhibit.getTechnology());
    }

    public Exhibit createExhibitShort()
    {
        return exhibitService.createExhibitShort();
    }

    public Exhibit updateExhibit(final String id, final Exhibit exhibit)
    {
        return exhibitService.updateExhibit(id,
                                            exhibit.getName(),
                                            exhibit.getDescription(),
                                            exhibit.getImageUrl(),
                                            exhibit.getPeriod(),
                                            exhibit.getInstrumentType(),
                                            exhibit.getRegion(),
                                            exhibit.getGenre(),
                                            exhibit.getTechnology());
    }

    public void deleteExhibit(final String id)
    {
        exhibitService.deleteExhibit(id);
    }
}
