import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import cors from "cors";
import { NotFoundError } from "./lib/errors/not-found-error";
import { errorHandler } from "./lib/middlewares/error-handler";
import { routes } from "./routes";
import { sequelize } from "./lib/database";
import { initTables } from "./lib/database/seed/init";
import { apiUsage } from "./lib/middlewares/api-usage";

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to database");
        await initTables();
    } catch (err) {
        console.error("Unable to connect to database");
    }

    const app = express();
    app.use(json());
    app.use(cors());

    app.use(apiUsage);
    app.use(routes);

    app.all("*", async (req: Request, res: Response, next: NextFunction) => {
        throw new NotFoundError();
    });

    app.use(errorHandler);

    app.listen(3000, () => {
        console.log("Listening on :3000");
    });
};

start();
