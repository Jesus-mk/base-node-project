import { ErrorClassification, EErrorCodes, Reason } from "./errorEnum";

export interface BaseValidation<T> {
  classification: ErrorClassification.Validation;
  keyToValidate: keyof T;
}

export interface BaseOperation {
  classification: ErrorClassification.Operation;
  message: string;
}

export interface IError {
  errorId?: number;
  code: EErrorCodes;
  message: Reason | string;
}
