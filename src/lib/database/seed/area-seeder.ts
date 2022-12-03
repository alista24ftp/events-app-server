import { Area, AreaModel } from "../../../models/area";
import { AreaService } from "../../fetch/area-service";

class AreaSeeder {
    private areaService: AreaService;

    constructor() {
        // Normally we would use dependency injection for EventService and AreaService here (as constructor args)
        // but for simplicity sake we ignore it for now and just create the services here
        this.areaService = new AreaService();
    }

    // User Story #2 (Populating DB with data from external API)
    async seed() {
        try {
            // This creates areas table if not exists
            await AreaModel.sync();

            // 1. fetch data from external API
            const areas = await this.areaService.getAreas("");

            if (areas.length > 0) {
                // 2. insert all fetched data into database
                await AreaModel.bulkCreate(areas, { validate: true });
            }
            
            return true;
        } catch (e) {
            // something went wrong, send back fail flag
            console.log(e);//
            return false;
        }
    }

    async clear() {
        // Clear all areas in the database
        try {
            await AreaModel.truncate();
            return true;
        } catch (e) {
            return false;
        }
    }
};

export { AreaSeeder };
