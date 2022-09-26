import { DBProperties } from "./employeeEnum";

type lenghValuesOfEmployeeValues = {
  [key in DBProperties]?: { minLength: number; maxLength: number } | undefined; // TODO Remove this Undefined
};

export namespace EmployeeValidationValues {
  export const lenghValues: lenghValuesOfEmployeeValues = {
    [DBProperties.name]: { minLength: 3, maxLength: 24 },
    [DBProperties.secondName]: { minLength: 3, maxLength: 24 },
    [DBProperties.contactEmail]: { minLength: 3, maxLength: 24 },
  };
  export const emailValidation: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
}
