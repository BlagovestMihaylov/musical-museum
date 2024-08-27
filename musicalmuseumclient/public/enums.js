// enums.js

const Genre = Object.freeze({
    CLASSICAL: 'CLASSICAL',
    JAZZ: 'JAZZ',
    ROCK: 'ROCK',
    FOLK: 'FOLK',
    BLUES: 'BLUES',
    ELECTRONIC: 'ELECTRONIC'
});

const InstrumentType = Object.freeze({
    STRING: 'STRING',
    WOODWIND: 'WOODWIND',
    BRASS: 'BRASS',
    PERCUSSION: 'PERCUSSION',
    KEYBOARD: 'KEYBOARD'
});

const Period = Object.freeze({
    ANTIQUITY: 'ANTIQUITY',
    MEDIEVAL: 'MEDIEVAL',
    RENAISSANCE: 'RENAISSANCE',
    BAROQUE: 'BAROQUE',
    CLASSICAL: 'CLASSICAL',
    ROMANTIC: 'ROMANTIC',
    MODERN: 'MODERN'
});

const Region = Object.freeze({
    EUROPE: 'EUROPE',
    ASIA: 'ASIA',
    AFRICA: 'AFRICA',
    AMERICAS: 'AMERICAS',
    OCEANIA: 'OCEANIA'
});

const Technology = Object.freeze({
    TRADITIONAL: 'TRADITIONAL',
    ELECTRONIC: 'ELECTRONIC',
    DIGITAL: 'DIGITAL',
    HYBRID: 'HYBRID'
});

// Export the enums for use in other JavaScript files
export { Genre, InstrumentType, Period, Region, Technology };
