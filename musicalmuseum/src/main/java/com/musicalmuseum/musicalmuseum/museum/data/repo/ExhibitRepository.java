package com.musicalmuseum.musicalmuseum.museum.data.repo;

import com.musicalmuseum.musicalmuseum.museum.data.enums.*;
import com.musicalmuseum.musicalmuseum.museum.data.model.Exhibit;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExhibitRepository extends MongoRepository<Exhibit, String>
{
    List<Exhibit> findByPeriod(Period period);
    List<Exhibit> findByInstrumentType(InstrumentType instrumentType);
    List<Exhibit> findByRegion(Region region);
    List<Exhibit> findByGenre(Genre genre);
    List<Exhibit> findByTechnology(Technology technology);
    List<Exhibit> findByName(String name);
}
