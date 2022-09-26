import { mysqlConnection } from "./service";

const startDb = function () {
  const connection = mysqlConnection();
  connection.connect((error: any) => {
    if (error) throw error;
    console.info("DB conexion ok");
  });
};

const stopDb = function () {
  const connection = mysqlConnection();
  return connection.end();
};

export { startDb, stopDb };
