import express, { Request, Response } from "express";
import { Op } from "sequelize";
import { EventService } from "../../lib/fetch/event-service";
import { EventRequest } from "../../lib/requests/event-request";
import { EventModel, getEvents } from "../../models/event";

const router = express.Router();

const eventService = new EventService();

// Get all Events (with filter queries)
// User Story #4 (Getting highest severity events by area) 
// can be fulfilled with filter query ?area={area}&severity=MAJOR
router.get("/", async (req: Request, res: Response) => {
    const eventQuery = new EventRequest(req.query);
    // An alternative is to fetch events from external open511 API directly
    // const events = await eventService.getEvents(eventQuery.toQueryStr());
    try {
        const events = await getEvents(eventQuery);

        res.send(events);
    } catch (e) {
        res.status(500).send("Something went wrong, please try again later");
    }
});

// User Story #4 (Create an Event)
router.post("/", async (req: Request, res: Response) => {
    const body = req.body;

    // 1. validate and insert event into database
    try {
        const newEvent = await EventModel.create(body);

        // send back newly created model with success code 201
        res.status(201).json(newEvent);
    } catch (e) {
        // send back error code if operation failed 
        res.status(400).send("Something went wrong while creating event, please try again later");
    }
});

export { router as EventsController };