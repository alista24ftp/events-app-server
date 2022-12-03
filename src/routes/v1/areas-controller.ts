import express, { Request, Response } from "express";
import { AreaModel } from "../../models/area";

const router = express.Router();

// Get all Areas
router.get("/", async (req: Request, res: Response) => {
    // Get areas from DB
    try {
        const areas = await AreaModel.findAll();
        res.send(areas);
    } catch (e) {
        res.status(500).send("Something went wrong, please try again later");
    }
});

export { router as AreasController };