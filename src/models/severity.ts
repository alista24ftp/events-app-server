const SeverityEnum = {
    UNKNOWN: "UNKNOWN",
    MINOR: "MINOR",
    MODERATE: "MODERATE",
    MAJOR: "MAJOR",
} as const;

type Severity = keyof typeof SeverityEnum;

const toSeverity = (str: string): Severity | undefined => {
    return Object.keys(SeverityEnum).includes(str) ? (Object(SeverityEnum))[str] : undefined;
};

export { Severity, toSeverity };
