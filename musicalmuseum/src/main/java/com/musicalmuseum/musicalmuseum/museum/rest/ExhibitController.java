package com.musicalmuseum.musicalmuseum.museum.rest;

import com.musicalmuseum.musicalmuseum.museum.data.enums.*;
import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import com.musicalmuseum.musicalmuseum.museum.data.service.ExhibitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/exhibits")
public class ExhibitController
{

    private final ExhibitService exhibitService;

    public ExhibitController(ExhibitService exhibitService)
    {
        this.exhibitService = exhibitService;
    }

    @GetMapping()
    public ResponseEntity<List<Exhibit>> getExhibits()
    {
        List<Exhibit> exhibit = exhibitService.getAllExhibits();
        return ResponseEntity.ok(exhibit);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Exhibit> getExhibitById(@PathVariable("id") String id)
    {
        Exhibit exhibit = exhibitService.getExhibitById(id);
        return ResponseEntity.ok(exhibit);
    }

    @GetMapping("/period/{period}")
    public ResponseEntity<List<Exhibit>> getExhibitsByPeriod(@PathVariable("period") Period period)
    {
        List<Exhibit> exhibits = exhibitService.getExhibitsByPeriod(period);
        return ResponseEntity.ok(exhibits);
    }

    @GetMapping("/instrumentType/{instrumentType}")
    public ResponseEntity<List<Exhibit>> getExhibitsByInstrumentType(@PathVariable("instrumentType") InstrumentType instrumentType)
    {
        List<Exhibit> exhibits = exhibitService.getExhibitsByInstrumentType(instrumentType);
        return ResponseEntity.ok(exhibits);
    }

    @GetMapping("/region/{region}")
    public ResponseEntity<List<Exhibit>> getExhibitsByRegion(@PathVariable("region") Region region)
    {
        List<Exhibit> exhibits = exhibitService.getExhibitsByRegion(region);
        return ResponseEntity.ok(exhibits);
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Exhibit>> getExhibitsByGenre(@PathVariable("genre") Genre genre)
    {
        List<Exhibit> exhibits = exhibitService.getExhibitsByGenre(genre);
        return ResponseEntity.ok(exhibits);
    }

    @GetMapping("/technology/{technology}")
    public ResponseEntity<List<Exhibit>> getExhibitsByTechnology(@PathVariable("technology") Technology technology)
    {
        List<Exhibit> exhibits = exhibitService.getExhibitsByTechnology(technology);
        return ResponseEntity.ok(exhibits);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<Exhibit>> getExhibitsByName(@PathVariable("name") String name)
    {
        List<Exhibit> exhibits = exhibitService.getExhibitsByName(name);
        return ResponseEntity.ok(exhibits);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Exhibit>> searchExhibits(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String period,
            @RequestParam(required = false) String instrumentType,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String technology) {

        List<Exhibit> exhibits = exhibitService.searchExhibits(name, period, instrumentType, region, genre, technology);
        return ResponseEntity.ok(exhibits);
    }
}
