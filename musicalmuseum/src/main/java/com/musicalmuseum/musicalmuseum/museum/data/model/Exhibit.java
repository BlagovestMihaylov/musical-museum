package com.musicalmuseum.musicalmuseum.museum.data.model;

import com.musicalmuseum.musicalmuseum.museum.data.enums.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "exhibits")
public class Exhibit
{
    @Id
    private String id;  // Use String for the ID

    @Indexed(unique = true)  // Index the name field and make it unique
    private String name;
    private String description;
    private String imageUrl;

    private Period period; // Historical period
    private InstrumentType instrumentType; // Type of musical instrument
    private Region region; // Region or geography of origin
    private Genre genre; // Musical genre
    private Technology technology; // Technological advancements

    public Exhibit(String id, String name, String description, String imageUrl,
                   Period period, InstrumentType instrumentType, Region region, Genre genre, Technology technology)
    {
        this.id = id; // Set the ID as a String
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.period = period;
        this.instrumentType = instrumentType;
        this.region = region;
        this.genre = genre;
        this.technology = technology;
    }
}
