import { Request, Response, NextFunction } from "express";
import { ApiUsageModel } from "../../models/api-usage";

// User Story #5: Monitoring API usage
export const apiUsage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usageInfo = await ApiUsageModel.create({
            method: req.method,
            path: req.path,
            user_agent: req.get("User-Agent"),
            origin: req.get("Origin"),
        });
    } catch (e) {
        console.log("Error inserting API usage info");
    } finally {
        next();
    }
};