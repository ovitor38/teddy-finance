import { Router } from "express";
import { container } from "tsyringe";
import { UserControllerHttp } from "../../infrastructure/http/user.controller";

export function userRoutes(app: Router): void {
  const userController = container.resolve(UserControllerHttp);

  app.post("/user", (req, res) => userController.create(req, res));
}

