import { Router } from "express";
import { employeeRouter } from "./entity/employee";
import { userRouter } from "./entity/user";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/employee", employeeRouter);

const apiIndex = {
  routes,
};

export default apiIndex;
