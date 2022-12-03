import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PG_HOSTNAME) {
    throw new Error("PG_HOSTNAME must be defined");
}
if (!process.env.PG_PORT) {
    throw new Error("PG_PORT must be defined");
}
if (!process.env.PG_USERNAME) {
    throw new Error("PG_USERNAME must be defined");
}
if (!process.env.PG_PASSWORD) {
    throw new Error("PG_PASSWORD must be defined");
}
if (!process.env.PG_DBNAME) {
    throw new Error("PG_DBNAME must be defined");
}

const sequelize = new Sequelize(process.env.PG_DBNAME, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
    host: process.env.PG_HOSTNAME,
    dialect: "postgres",
});

export { sequelize };
