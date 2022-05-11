import { createSessionSchema } from "./schema/session.schema";
import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";
import checkUser from "./middleware/checkUser";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).send("Route in working");
  });
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateRequest(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", checkUser, getUserSessionsHandler);
  app.delete("/api/sessions", checkUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [checkUser, validateRequest(createProductSchema)],
    createProductHandler
  );
  app.get(
    "/api/products",
    [checkUser, validateRequest(getProductSchema)],
    getProductHandler
  );
  app.put(
    "/api/products",
    [checkUser, validateRequest(updateProductSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/products",
    [checkUser, validateRequest(deleteProductSchema)],
    deleteProductHandler
  );
};

export default routes;
