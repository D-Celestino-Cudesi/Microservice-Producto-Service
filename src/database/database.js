import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(
    "BD-Microservice01", // db name,
    "postgres", // username
    "root", // password
    {
        host: "localhost",
        dialect: "postgres",
    });