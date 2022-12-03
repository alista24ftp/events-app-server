import { Event, EventModel } from "../../../models/event";
import { EventService } from "../../fetch/event-service";

class EventSeeder {
    private eventService: EventService;

    constructor() {
        // Normally we would use dependency injection for EventService and AreaService here (as constructor args)
        // but for simplicity sake we ignore it for now and just create the services here
        this.eventService = new EventService();
    }

    // User Story #2 (Populating DB with data from external API)
    // NOTE: There's way too much event data from the external API, so for both simplicity and practicality
    // sake I limited the max number of events to be populated to 5000, which should be more than enough 
    // for the purposes of this assessment question (in the real world, consider adding a queue to process
    // background jobs, and set the max number of events to a greater number, say 450000-ish)
    async seed() {
        let offset = 0;
        const limit = 500;
        const maxTotalEvents = 5000; // set this to 5000 events (should be more than enough for this question)

        // This creates events table if not exists
        await EventModel.sync();

        while (true) {
            try {
                // 1. fetch data from external API
                const events = await this.eventService.getEvents(`limit=${limit}&offset=${offset}`);
                if (events.length === 0 || offset > maxTotalEvents) return true;

                // 2. insert all fetched data into database
                const eventModels = await EventModel.bulkCreate(events, { validate: true });

                // 3. increment offset and repeat 1-2
                offset += events.length;
            } catch (e) {
                // something went wrong, send back fail flag
                console.log(e);//
                return false;
            }
        }
    }

    async clear() {
        // Clear all events in the database
        try {
            await EventModel.truncate();
            return true;
        } catch (e) {
            return false;
        }
    }
};

export { EventSeeder };
