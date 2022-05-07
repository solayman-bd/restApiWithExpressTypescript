import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).send("Route in working");
  });
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
};

export default routes;
