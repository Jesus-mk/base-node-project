import { employeeService } from ".";
import { classTools } from "../../tools";
import { DBProperties } from "./employeeEnum";
import { EmployeeValidationValues } from "./employeeValidation";

export interface IEmployee {
  readonly [DBProperties.id]: number | undefined;
  [DBProperties.name]: string;
  [DBProperties.secondName]: string;
  [DBProperties.thirdName]: string | undefined;
  [DBProperties.contactEmail]: string;
}

export default class Employee implements IEmployee {
  readonly id: number | undefined;
  name: string;
  secondName: string;
  thirdName: string | undefined;
  contactEmail: string;

  constructor(name: string, secondName: string, contactEmail: string, thirdName?: string, id?: number) {
    this.id = id;
    this.name = name;
    this.secondName = secondName;
    this.thirdName = thirdName;
    this.contactEmail = contactEmail;
  }

  async validate() {
    this.validateNulls();
    this.validateLength();
    this.validateEmail();
    return this.validateUniqueValues(); // TODO This probably should be out of this method.
  }

  validateNulls(): void {
    const propertiesToValidate = [DBProperties.name, DBProperties.secondName, DBProperties.contactEmail];

    Object.values(propertiesToValidate).forEach((key) => classTools.checkNullProperties<typeof this>(this, key));
  }

  validateLength(): void {
    const propertiesToValidate = [DBProperties.name, DBProperties.secondName, DBProperties.contactEmail];

    Object.values(propertiesToValidate).forEach((key) =>
      classTools.checkPropertyStringLenght<typeof this>(this, key, EmployeeValidationValues.lenghValues)
    );
  }

  validateEmail(): void {
    classTools.checkPropertyByRegrex<typeof this>(
      this,
      DBProperties.contactEmail,
      EmployeeValidationValues.emailValidation
    );
  }

  async validateUniqueValues() {
    const res = await employeeService.findByProperty(DBProperties.contactEmail, this.contactEmail);
    return classTools.checkExistingValue<typeof this>(this, DBProperties.contactEmail, res.status, "Duplicated");
  }
}
