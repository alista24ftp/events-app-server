import { DataTypes, Model, Op } from "sequelize";
import { sequelize } from "../lib/database";

import { Area, toArea } from "./area";
import { EventSubtype, toEventSubtype } from "./event-subtype";
import { EventType, toEventType } from "./event-type";
import { isGeographyType, LineStringGeography, PointGeography } from "./geography";
import { isRoad, Road } from "./road";
import { RecurringSchedule, toRecurringSchedule } from "./recurring-schedule";
import { Severity, toSeverity } from "./severity";
import _ from "lodash";
import { EventRequest } from "../lib/requests/event-request";

interface Event {
    jurisdiction_url: string,
    url: string,
    id: string,
    headline: string,
    status: "ACTIVE" | "ARCHIVED",
    created: string, // DateTime string
    updated: string, // DateTime string
    description?: string,
    "+ivr_message"?: string,
    "+linear_reference_km"?: number,
    schedule: {
        recurring_schedules: RecurringSchedule[],
    } | {
        intervals: string[], // DateTime string array
    },
    event_type: EventType,
    event_subtypes?: EventSubtype[],
    severity: Severity,
    geography: PointGeography | LineStringGeography,
    roads?: Road[],
    areas?: Area[],
};

class EventModel extends Model<Event> {};
EventModel.init({
    jurisdiction_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    headline: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["ACTIVE", "ARCHIVED"]]
        }
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    updated: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    description: {
        type: DataTypes.TEXT,
    },
    "+ivr_message": {
        type: DataTypes.TEXT,
    },
    "+linear_reference_km": {
        type: DataTypes.FLOAT,
    },
    schedule: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
            isSchedule(value: any) {
                const recSchedules = _.get(value, "recurring_schedules");
                const intSchedules = _.get(value, "intervals");
                if (!_.isNil(recSchedules)) {
                    // recurring schedules
                    if (!_.isArray(recSchedules) || recSchedules.some(s => _.isNil(toRecurringSchedule(s)))) {
                        throw new Error("Invalid recurring schedules");
                    }
                } else if (!_.isNil(intSchedules)) {
                    // intervals
                    if (!_.isArray(intSchedules) || intSchedules.some(s => !_.isString(s))) {
                        throw new Error("Invalid intervals");
                    }
                } else {
                    throw new Error("Invalid schedule");//
                }
            }
        }
    },
    event_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEventType(value: string) {
                if (_.isNil(toEventType(value))) {
                    throw new Error("Invalid event type");
                }
            }
        }
    },
    event_subtypes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            isEventSubtypes(value: string[]) {
                if (value.some(v => _.isNil(toEventSubtype(v)))) {
                    throw new Error("Invalid event subtypes");
                }
            }
        }
    },
    severity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isSeverity(value: string) {
                if (_.isNil(toSeverity(value))) {
                    throw new Error("Invalid severity");
                }
            }
        }
    },
    geography: {
        // type: DataTypes.GEOMETRY, // ideally use this, but requires a bit of setup
        // instead use JSONB with validation rules instead to simulate GEOMETRY type
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
            isGeometryType(value: any) {
                const { ok, errMsg } = isGeographyType(value);
                if (!ok) {
                    throw new Error(errMsg);
                }
            }
        }
    },
    roads: {
        type: DataTypes.JSONB,
        validate: {
            isRoads(value: any) {
                // field is nullable, so no need to validate if field doesn't exist
                if (_.isNil(value)) return;

                if (!_.isArray(value) || value.some(v => !isRoad(v))) {
                    throw new Error("Invalid roads");
                }
            }
        }
    },
    areas: {
        type: DataTypes.JSONB,
        validate: {
            isAreas(value: any) {
                // field is nullable, so no need to validate if field doesn't exist
                if (_.isNil(value)) return;

                if (!_.isArray(value) || value.some(v => _.isNil(toArea(v)))) {
                    throw new Error("Invalid area");
                }
            }
        }
    },
}, {
    sequelize,
    modelName: "Event"
});

const getEvents = async (eventReq: EventRequest) => {
    try {
        const whereParam: any = {};
        let emptyWhere = true;

        if (eventReq.eventType) {
            whereParam.event_type = { [Op.eq]: eventReq.eventType };
            emptyWhere = false;
        }
        if (eventReq.severity) {
            whereParam.severity = { [Op.eq]: eventReq.severity };
            emptyWhere = false;
        }
        if (eventReq.area) {
            whereParam.areas = {
                [Op.contains]: [{ id: eventReq.area }]
            };
            emptyWhere = false;
        }
        if (eventReq.startDate) {
            whereParam.created = {
                [Op.gte]: new Date(eventReq.startDate),
            };
            emptyWhere = false;
        }
        
        const opts: any = {
            limit: eventReq.limit,
            offset: eventReq.offset,
        };
        if (!emptyWhere) {
            opts.where = whereParam;
        }

        const events = await EventModel.findAll(opts);
        return events;
    } catch (e) {
        throw e;
    }
};

export { Event, EventModel, getEvents };
