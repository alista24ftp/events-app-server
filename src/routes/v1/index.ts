import express from "express";
import { ApiUsageController } from "./api-usage-controller";
import { AreasController } from "./areas-controller";
import { DbPopulationController } from "./db-population-controller";
import { EventsController } from "./events-controller";

const router = express.Router();

router.use("/events", EventsController);
router.use("/areas", AreasController);
router.use("/db-population", DbPopulationController);
router.use("/api-usage", ApiUsageController);

export { router as v1 };
