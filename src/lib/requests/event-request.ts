import _ from "lodash";
import * as qs from "qs";

import { toEventType } from "../../models/event-type";
import { toSeverity, Severity } from "../../models/severity";

class EventRequest {
    public limit = 20;
    public offset = 0;
    public severity?: Severity;
    public area?: string;
    public eventType?: string;
    public startDate?: string;

    constructor(data: any) {
        const offset = _.get(data, "offset");
        const severity = _.get(data, "severity");
        const area = _.get(data, "area");
        const eventType = _.get(data, "event_type");
        const startDate = _.get(data, "start_date");

        if (!_.isNil(offset) && !_.isNaN(offset) && Number(offset) >= 0) {
            this.offset = Number(offset);
        }
        if (!_.isNil(severity) && _.isString(severity)) {
            this.severity = toSeverity(severity.trim());
        }
        if (!_.isNil(area) && _.isString(area) && !_.isEmpty(area.trim())) {
            this.area = area.trim();
        }
        if (!_.isNil(eventType) && _.isString(eventType)) {
            this.eventType = toEventType(eventType.trim());
        }
        if (!_.isNil(startDate) && _.isString(startDate)) {
            this.startDate = startDate.trim();
        }
    }

    toQueryStr() {
        const queryObj: any = { limit: this.limit, offset: this.offset };
        if (!_.isNil(this.severity)) {
            queryObj.severity = this.severity;
        }
        if (!_.isNil(this.area)) {
            queryObj.area_id = this.area;
        }
        if (!_.isNil(this.eventType)) {
            queryObj.event_type = this.eventType;
        }
        if (!_.isNil(this.startDate)) {
            queryObj.created = ">" + this.startDate;
        }

        return qs.stringify(queryObj, {
            encode: false,
        });
    }
}

export { EventRequest };
