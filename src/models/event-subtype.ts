const EventSubtypeEnum = {
    ACCIDENT: "ACCIDENT", 
    SPILL: "SPILL", 
    OBSTRUCTION: "OBSTRUCTION",
    HAZARD: "HAZARD",
    ROAD_MAINTENANCE: "ROAD_MAINTENANCE",
    ROAD_CONSTRUCTION: "ROAD_CONSTRUCTION",
    EMERGENCY_MAINTENANCE: "EMERGENCY_MAINTENANCE",
    PLANNED_EVENT: "PLANNED_EVENT",
    CROWD: "CROWD",
    HAIL: "HAIL",
    THUNDERSTORM: "THUNDERSTORM",
    HEAVY_DOWNPOUR: "HEAVY_DOWNPOUR",
    STRONG_WINDS: "STRONG_WINDS",
    BLOWING_DUST: "BLOWING_DUST",
    SANDSTORM: "SANDSTORM",
    INSECT_SWARMS: "INSECT_SWARMS",
    AVALANCHE_HAZARD: "AVALANCHE_HAZARD",
    SURFACE_WATER_HAZARD: "SURFACE_WATER_HAZARD",
    MUD: "MUD",
    LOOSE_GRAVEL: "LOOSE_GRAVEL",
    OIL_ON_ROADWAY: "OIL_ON_ROADWAY",
    FIRE: "FIRE",
    SIGNAL_LIGHT_FAILURE: "SIGNAL_LIGHT_FAILURE",
    PARTLY_ICY: "PARTLY_ICY",
    ICE_COVERED: "ICE_COVERED",
    PARTLY_SNOW_PACKED: "PARTLY_SNOW_PACKED",
    SNOW_PACKED: "SNOW_PACKED",
    PARTLY_SNOW_COVERED: "PARTLY_SNOW_COVERED",
    SNOW_COVERED: "SNOW_COVERED",
    DRIFTING_SNOW: "DRIFTING_SNOW",
    POOR_VISIBILITY: "POOR_VISIBILITY",
    ALMOST_IMPASSABLE: "ALMOST_IMPASSABLE",
    PASSABLE_WITH_CARE: "PASSABLE_WITH_CARE",
} as const;

type EventSubtype = keyof typeof EventSubtypeEnum;

const toEventSubtype = (str: string): EventSubtype | undefined => {
    return Object.keys(EventSubtypeEnum).includes(str) ? (Object(EventSubtypeEnum))[str] : undefined;
};

export { EventSubtype, toEventSubtype };
