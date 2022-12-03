import { ApiUsageModel } from "../../../models/api-usage";
import { AreaModel } from "../../../models/area";
import { EventModel } from "../../../models/event";

const initTables = async () => {
    await AreaModel.sync();
    await EventModel.sync();
    await ApiUsageModel.sync();
};

export { initTables };
