import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import extractUser from "./middleware/extractUser";

const port = config.get<number>("port");

const app = express();
app.use(express.json());
app.use(extractUser);
app.listen(port, async () => {
  logger.info(`App in running to port http://localhost:${port}`);
  await connect();
  routes(app);
});
