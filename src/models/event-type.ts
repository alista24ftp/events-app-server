const EventTypeEnum = {
    CONSTRUCTION: "CONSTRUCTION",
    SPECIAL_EVENT: "SPECIAL_EVENT",
    INCIDENT: "INCIDENT",
    WEATHER_CONDITION: "WEATHER_CONDITION",
    ROAD_CONDITION: "ROAD_CONDITION",
} as const;

type EventType = keyof typeof EventTypeEnum;

const toEventType = (str: string): EventType | undefined => {
    return Object.keys(EventTypeEnum).includes(str) ? (Object(EventTypeEnum))[str] : undefined;
};

export { EventType, toEventType };
