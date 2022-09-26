import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

const ENV = {
  port: process.env.PROJECT_PORT,

  databaseLoggin: {
    host: process.env.PROJECT_HOST,
    user: process.env.PROJECT_USER,
    password: process.env.PROJECT_PASSWORD,
    database: process.env.PROJECT_DATABASE,
  },
};

export * as configIndex from "./";
export * as db from "./db";
export * as configService from "./service";
export * as Port from "./service";
export { ENV };
