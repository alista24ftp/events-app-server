import axios from "axios";
import fetch from 'node-fetch';
import _ from "lodash";
import { Event } from "../../models/event";

const HOST_NAME = "https://api.open511.gov.bc.ca";

class EventService {
    bustCache(url: string) {
        return `${url}&cb=${Date.now()}`;
    }
    
    async getEvents(queryStr: string): Promise<Event[]> {
        try {
            const url = `${HOST_NAME}/events?format=json&status=ALL&${queryStr}`;
            //const { data, status } = await axios.get(this.bustCache(url));
            const res = await fetch(this.bustCache(url), { 
                method: "GET",
            });
            const body = await res.json() as any;

            if (res.status !== 200) return [];

            const events = _.get(body, "events", []) as Event[];
            return events;
        } catch (e) {
            console.log(e);//
            return [];
        }
    }
}

export { EventService };