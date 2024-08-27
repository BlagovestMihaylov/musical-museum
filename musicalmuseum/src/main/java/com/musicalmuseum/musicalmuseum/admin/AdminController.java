package com.musicalmuseum.musicalmuseum.admin;

import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import com.musicalmuseum.musicalmuseum.shop.ShopAd;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("api/admin")
public class AdminController
{
    private final AdminService adminService;

    public AdminController(AdminService adminService)
    {
        this.adminService = adminService;
    }

    @PostMapping("/shopad")
    public ResponseEntity<ShopAd> createShopAd(@RequestBody ShopAd shopAd)
    {
        shopAd.setDatePosted(new Date());
        ShopAd createdShopAd = adminService.createShopAd(shopAd);
        return ResponseEntity.ok(createdShopAd);
    }

    @PutMapping("/shopad/{id}")
    public ResponseEntity<ShopAd> updateShopAd(@PathVariable("id") String id, @RequestBody ShopAd shopAd)
    {
        ShopAd updatedShopAd = adminService.updateShopAd(id, shopAd);
        return ResponseEntity.ok(updatedShopAd);
    }

    @DeleteMapping("/shopad/{id}")
    public ResponseEntity<Void> deleteShopAd(@PathVariable("id") String id)
    {
        adminService.deleteShopAd(id);
        return ResponseEntity.noContent()
                             .build();
    }

    @PostMapping("/exhibit")
    public ResponseEntity<Exhibit> createExhibit(@RequestBody Exhibit exhibit)
    {
        Exhibit createdExhibit = adminService.createExhibit(exhibit);
        return ResponseEntity.ok(createdExhibit);
    }

    @GetMapping("/exhibit/short")
    public ResponseEntity<Exhibit> createExhibitShort()
    {
        Exhibit createdExhibit = adminService.createExhibitShort();
        return ResponseEntity.ok(createdExhibit);
    }

    @PutMapping("/exhibit/{id}")
    public ResponseEntity<Exhibit> updateExhibit(
            @PathVariable("id") String id,
            @RequestBody Exhibit exhibit
    )
    {
        Exhibit updatedExhibit = adminService.updateExhibit(id, exhibit);
        return ResponseEntity.ok(updatedExhibit);
    }

    @DeleteMapping("/exhibit/{id}")
    public ResponseEntity<Void> deleteExhibit(@PathVariable("id") String id)
    {
        adminService.deleteExhibit(id);
        return ResponseEntity.noContent()
                             .build();
    }
}
