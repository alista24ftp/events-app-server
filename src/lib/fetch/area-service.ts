import axios from "axios";
import _ from "lodash";
import { Area, toArea } from "../../models/area";

const HOST_NAME = "http://api.open511.gov.bc.ca";

class AreaService {
    async getAreas(queryStr: string): Promise<Area[]> {
        try {
            const { data, status } = await axios.request({
                method: "GET",
                url: `${HOST_NAME}/areas?${queryStr}`,
            });

            if (status !== 200) {
                return [];
            }

            const areas = _.get(data, "areas", [])
                .map((a: any) => toArea(a))
                .filter((a: Area | undefined) => !_.isNil(a)) as Area[];
            return areas;
        } catch (e) {
            return [];
        }
    }
}

export { AreaService };