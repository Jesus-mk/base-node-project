import mysql from "mysql";
import { ENV } from ".";

export const mysqlConnection = () => mysql.createConnection(ENV.databaseLoggin);
