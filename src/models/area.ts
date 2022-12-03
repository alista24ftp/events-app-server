import _ from "lodash";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/database";

interface Area {
    url: string,
    id: string,
    name: string,
};

class AreaModel extends Model<Area> {}
AreaModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Area",
});

const toArea = (data: any): Area | undefined => {
    const url = _.get(data, "url");
    const id = _.get(data, "id");
    const name = _.get(data, "name");

    if (_.isNil(url) || !_.isString(url)) return undefined;
    if (_.isNil(id) || !_.isString(id)) return undefined;
    if (_.isNil(name) || !_.isString(name)) return undefined;

    return {
        url: url.trim(),
        id: id.trim(),
        name: name.trim(),
    };
};

export { Area, AreaModel, toArea };
