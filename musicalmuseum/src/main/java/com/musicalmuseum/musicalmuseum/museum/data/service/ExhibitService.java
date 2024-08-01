package com.musicalmuseum.musicalmuseum.museum.data.service;

import com.musicalmuseum.musicalmuseum.museum.data.enums.*;
import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import com.musicalmuseum.musicalmuseum.museum.data.repo.ExhibitRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class ExhibitService
{
    private final ExhibitRepository exhibitRepository;

    public ExhibitService(ExhibitRepository exhibitRepository)
    {
        this.exhibitRepository = exhibitRepository;
    }

    public List<Exhibit> getAllExhibits()
    {
        System.out.println("GET ALL");
        return exhibitRepository.findAll();
    }

    public List<Exhibit> searchExhibits(String name, String period, String instrumentType, String region, String genre, String technology)
    {
        List<Exhibit> exhibits = exhibitRepository.findAll();

        if (name != null && !name.isEmpty())
        {
            exhibits = exhibits.stream()
                               .filter(exhibit -> exhibit.getName()
                                                         .toLowerCase()
                                                         .contains(name.toLowerCase()))
                               .collect(Collectors.toList());
        }

        if (period != null && !period.isEmpty())
        {
            exhibits = exhibits.stream()
                               .filter(exhibit -> period.equalsIgnoreCase(exhibit.getPeriod()
                                                                                 .name()))
                               .collect(Collectors.toList());
        }

        if (instrumentType != null && !instrumentType.isEmpty())
        {
            exhibits = exhibits.stream()
                               .filter(exhibit -> instrumentType.equalsIgnoreCase(exhibit.getInstrumentType()
                                                                                         .name()))
                               .collect(Collectors.toList());
        }

        if (region != null && !region.isEmpty())
        {
            exhibits = exhibits.stream()
                               .filter(exhibit -> region.equalsIgnoreCase(exhibit.getRegion()
                                                                                 .name()))
                               .collect(Collectors.toList());
        }

        if (genre != null && !genre.isEmpty())
        {
            exhibits = exhibits.stream()
                               .filter(exhibit -> genre.equalsIgnoreCase(exhibit.getGenre()
                                                                                .name()))
                               .collect(Collectors.toList());
        }

        if (technology != null && !technology.isEmpty())
        {
            exhibits = exhibits.stream()
                               .filter(exhibit -> technology.equalsIgnoreCase(exhibit.getTechnology()
                                                                                     .name()))
                               .collect(Collectors.toList());
        }

        return exhibits;
    }

    public Exhibit getExhibitById(String exhibitId)
    {
        return exhibitRepository.findById(exhibitId)
                                .orElseThrow(() -> new RuntimeException("Exhibit not found"));
    }

    public Exhibit createExhibit(String id, String name, String description, String imageUrl,
                                 Period period, InstrumentType instrumentType, Region region, Genre genre, Technology technology)
    {
        Exhibit exhibit = new Exhibit(id, name, description, imageUrl,
                                      period, instrumentType, region, genre, technology);
        return exhibitRepository.save(exhibit);
    }

    public Exhibit createExhibitShort()
    {
        // Generate a random ID
        String id = UUID.randomUUID()
                        .toString();

        // Define possible values for each field
        List<String> names = Arrays.asList("Stradivarius Violin", "Yamaha Grand Piano", "Gibson Les Paul",
                                           "Fender Stratocaster");
        List<String> descriptions = Arrays.asList("A historic string instrument", "A classic grand piano",
                                                  "A popular electric guitar", "A legendary electric guitar");
        List<String> imageUrls = Arrays.asList("/images/violin.jpg", "/images/piano.jpg", "/images/lespaul.jpg",
                                               "/images/stratocaster.jpg");
        List<Period> periods = Arrays.asList(Period.BAROQUE, Period.CLASSICAL, Period.RENAISSANCE, Period.ROMANTIC);
        List<InstrumentType> instrumentTypes = Arrays.asList(InstrumentType.STRING, InstrumentType.KEYBOARD,
                                                             InstrumentType.PERCUSSION);
        List<Region> regions = Arrays.asList(Region.EUROPE, Region.ASIA, Region.AMERICAS);
        List<Genre> genres = Arrays.asList(Genre.CLASSICAL, Genre.JAZZ, Genre.ROCK);
        List<Technology> technologies = Arrays.asList(Technology.TRADITIONAL, Technology.DIGITAL);

        // Randomly select a value for each field
        String name = names.get(ThreadLocalRandom.current()
                                                 .nextInt(names.size()));
        String description = descriptions.get(ThreadLocalRandom.current()
                                                               .nextInt(descriptions.size()));
        String imageUrl = imageUrls.get(ThreadLocalRandom.current()
                                                         .nextInt(imageUrls.size()));
        Period period = periods.get(ThreadLocalRandom.current()
                                                     .nextInt(periods.size()));
        InstrumentType instrumentType = instrumentTypes.get(ThreadLocalRandom.current()
                                                                             .nextInt(instrumentTypes.size()));
        Region region = regions.get(ThreadLocalRandom.current()
                                                     .nextInt(regions.size()));
        Genre genre = genres.get(ThreadLocalRandom.current()
                                                  .nextInt(genres.size()));
        Technology technology = technologies.get(ThreadLocalRandom.current()
                                                                  .nextInt(technologies.size()));

        // Create and save the exhibit
        return createExhibit(id, name, description, imageUrl, period, instrumentType, region, genre, technology);
    }

    public Exhibit updateExhibit(String exhibitId, String name, String description, String imageUrl,
                                 Period period, InstrumentType instrumentType, Region region, Genre genre, Technology technology)
    {
        Exhibit exhibit = getExhibitById(exhibitId);
        exhibit.setName(name);
        exhibit.setDescription(description);
        exhibit.setImageUrl(imageUrl);
        exhibit.setPeriod(period);
        exhibit.setInstrumentType(instrumentType);
        exhibit.setRegion(region);
        exhibit.setGenre(genre);
        exhibit.setTechnology(technology);
        return exhibitRepository.save(exhibit);
    }

    public void deleteExhibit(String exhibitId)
    {
        exhibitRepository.deleteById(exhibitId);
    }

    // Retrieve all exhibits from a specific period
    public List<Exhibit> getExhibitsByPeriod(Period period)
    {
        return exhibitRepository.findByPeriod(period);
    }

    // Retrieve all exhibits of a specific instrument type
    public List<Exhibit> getExhibitsByInstrumentType(InstrumentType instrumentType)
    {
        return exhibitRepository.findByInstrumentType(instrumentType);
    }

    // Retrieve all exhibits from a specific region
    public List<Exhibit> getExhibitsByRegion(Region region)
    {
        return exhibitRepository.findByRegion(region);
    }

    // Retrieve all exhibits of a specific genre
    public List<Exhibit> getExhibitsByGenre(Genre genre)
    {
        return exhibitRepository.findByGenre(genre);
    }

    // Retrieve all exhibits with a specific technology
    public List<Exhibit> getExhibitsByTechnology(Technology technology)
    {
        return exhibitRepository.findByTechnology(technology);
    }

    public List<Exhibit> getExhibitsByName(String name)
    {
        return exhibitRepository.findByName(name);
    }
}

