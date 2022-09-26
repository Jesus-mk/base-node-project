import { getOneById } from "../../repository/repositoryService";
import { classTools } from "../../tools";
import { employeeService } from "../employee";
import { DBProperties } from "./userEnum";
import { UserValidationValues } from "./userValidation";

export interface IUser {
  readonly [DBProperties.id]: number | undefined;
  [DBProperties.email]: string;
  [DBProperties.password]: string;
  [DBProperties.idEmployee]: number;
}

export default class User implements IUser {
  readonly id: number | undefined;
  email: string;
  password: string;
  idEmployee: number;

  constructor(email: string, password: string, idEmployee: number, id?: number) {
    this.email = email;
    this.password = password;
    this.idEmployee = idEmployee;
    this.id = id;
  }

  async getUser(id: number) {
    return getOneById(this.constructor.name, id);
  }

  validate() {
    this.validateNulls();
    this.validateLength();
  }

  async validateConstraints() {
    return this.checkIfEmployeeExist(this.idEmployee);
  }

  validateNulls(): void {
    const propertiesToValidate = [DBProperties.email, DBProperties.password, DBProperties.idEmployee];

    Object.values(propertiesToValidate).forEach((key) => classTools.checkNullProperties<typeof this>(this, key));
  }

  validateLength(): void {
    const propertiesToValidate = [DBProperties.email, DBProperties.password];

    Object.values(propertiesToValidate).forEach((key) =>
      classTools.checkPropertyStringLenght<typeof this>(this, key, UserValidationValues.lenghValues)
    );
  }

  async checkIfEmployeeExist(id: number): Promise<void> {
    const res = await employeeService.findById(id);
    classTools.checkExistingValue<typeof this>(this, DBProperties.idEmployee, res.status, "Not Found");
  }
}
