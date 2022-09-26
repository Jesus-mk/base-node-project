import { Response } from "express";
import User, { IUser } from "./User";

export const validateUser = (req: { body: IUser }, res: Response, next: () => void) => {
  const user = new User(req.body.email, req.body.password, req.body.idEmployee);

  try {
    user.validate();

    next();
  } catch (error: any) {
    res.send(error);
  }
};

export const validateUserConstraints = async (req: { body: IUser }, res: Response, next: () => void) => {
  const user = new User(req.body.email, req.body.password, req.body.idEmployee);

  try {
    await user.validateConstraints();

    next();
  } catch (error: any) {
    res.send(error);
  }
};
