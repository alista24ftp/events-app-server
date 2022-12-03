import _ from "lodash";

interface PointGeography {
    type: "Point",
    coordinates: number[],
};

interface LineStringGeography {
    type: "LineString",
    coordinates: number[][],
};

const isGeographyType = (value: any) => {
    const type = _.get(value, "type");
    const coords = _.get(value, "coordinates");

    if (_.isNil(type) || !_.isString(type) || !["Point", "LineString"].includes(type.trim())) {
        return { ok: false, errMsg: "Invalid geography type" };
    }

    if (_.isNil(coords) || !_.isArray(coords) || coords.length === 0) {
        return { ok: false, errMsg: "Invalid coordinates" };
    }

    if (type.trim() === "Point") {
        if (coords.length !== 2 || _.isNaN(coords[0]) || _.isNaN(coords[1])) {
            return { ok: false, errMsg: "Invalid Point coordinates" };
        }
    } else if (coords.some(c => c.length !== 2 || _.isNaN(c[0]) || _.isNaN(c[1]))) {
        // LineString
        return { ok: false, errMsg: "Invalid LineString coordinates" };
    }

    return { ok: true, errMsg: "" };
};

export { PointGeography, LineStringGeography, isGeographyType };
