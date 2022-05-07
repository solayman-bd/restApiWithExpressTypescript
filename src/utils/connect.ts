import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("mongoUri");
  try {
    await mongoose.connect(dbUri);
    log.info("Database connection successful");
  } catch (e) {
    log.error("There is an error to connect to db");
    process.exit(1);
  }
};

export default connect;
