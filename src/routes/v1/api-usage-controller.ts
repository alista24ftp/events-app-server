import express, { Request, Response } from "express";
import { sequelize } from "../../lib/database";
import { ApiUsageModel } from "../../models/api-usage";

const router = express.Router();

// User Story #5: Get API Usage Data
router.get("/", async (req: Request, res: Response) => {
    try {
        const { display, offset } = req.query;
        if (display === "full") {
            const fullUsageInfo = await ApiUsageModel.findAll({
                limit: 20,
                offset: offset && !isNaN(Number(offset)) ? Number(offset) : undefined,
            });
            res.send(fullUsageInfo);
        } else {
            const usageInfo = await ApiUsageModel.findAll({
                group: ["method", "path"],
                attributes: [
                    "method", "path", 
                    [sequelize.fn("COUNT", "*"), "req_count"],
                ],
                order: [["req_count", "DESC"]],
            });
            res.send(usageInfo);
        }
    } catch (e) {
        res.status(500).send("Something went wrong, please try again later");
    }
});

export { router as ApiUsageController };