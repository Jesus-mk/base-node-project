import app from "./app";
import { configIndex } from "./config/index";

const PORT = configIndex.ENV.port;

const server = app.listen(PORT, () => console.info(`Server is listening on ${PORT}`));

configIndex.db.startDb();

export default server;
