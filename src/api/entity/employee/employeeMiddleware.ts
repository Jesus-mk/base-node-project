import { Response } from "express";
import Employee, { IEmployee } from "./Employee";

export const validateEmployee = async (req: { body: IEmployee }, res: Response, next: () => void) => {
  const employee = new Employee(req.body.name, req.body.secondName, req.body.contactEmail, req.body.thirdName);

  try {
    await employee.validate();

    next();
  } catch (error: any) {
    res.send(error);
  }
};
