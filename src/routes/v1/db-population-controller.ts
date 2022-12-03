import express, { Request, Response } from "express";
import { AreaSeeder } from "../../lib/database/seed/area-seeder";
import { EventSeeder } from "../../lib/database/seed/event-seeder";
import { ApiUsageModel } from "../../models/api-usage";

const router = express.Router();

const eventSeeder = new EventSeeder();
const areaSeeder = new AreaSeeder();

// User Story #2 (Populating DB with data from external API)
router.post("/", async (req: Request, res: Response) => {
    const areaSeedSuccess = await areaSeeder.seed();
    if (!areaSeedSuccess) {
        res.statusCode = 500;
        res.json({
            error: {
                message: "Area seeding failed"
            }
        });
        return;
    }

    const eventSeedSuccess = await eventSeeder.seed(); 
    if (!eventSeedSuccess) {
        res.statusCode = 500;
        res.json({
            error: {
                message: "Event seeding failed"
            }
        });
        return;
    }

    res.status(204).send();
});

router.delete("/", async (req: Request, res: Response) => {
    // Reset the database
    const areaClearSuccess = await areaSeeder.clear();
    if (!areaClearSuccess) {
        res.statusCode = 500;
        res.json({
            error: {
                message: "Failed to clear areas in DB"
            }
        });
        return;
    }

    const eventClearSuccess = await eventSeeder.clear(); 
    if (!eventClearSuccess) {
        res.statusCode = 500;
        res.json({
            error: {
                message: "Failed to clear events in DB"
            }
        });
        return;
    }

    await ApiUsageModel.truncate();

    res.status(204).send();
});

export { router as DbPopulationController };