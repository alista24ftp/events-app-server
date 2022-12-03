import _ from "lodash";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../lib/database";

class ApiUsageModel extends Model<InferAttributes<ApiUsageModel>, InferCreationAttributes<ApiUsageModel>> {
    declare id: CreationOptional<number>;
    declare method: string;
    declare path: string;
    declare user_agent?: string;
    declare origin?: string;
}
ApiUsageModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_agent: {
        type: DataTypes.TEXT,
    },
    origin: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    modelName: "ApiUsage",
});

export { ApiUsageModel };
