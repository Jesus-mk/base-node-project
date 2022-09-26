import { employeeErrorHandler } from "../../entity/employee/employeeErrorHandler";
import { EmployeeErrorOperation, EmployeeErrorValidation } from "../../entity/employee/employeeInterface";
import { ErrorLogOperation } from "../../entity/errorLog/errorLogInterface";
import { EEntityNames } from "../../repository/enum";
import { userErrorHandler } from "../../entity/user/userErrorHandler";
import { UserErrorOperation, UserErrorValidation } from "../../entity/user/userInterface";
import { ResponseStatus } from "../interfaceTools";

type ErrorStructures<T> =
  | UserErrorValidation<T>
  | UserErrorOperation
  | ErrorLogOperation
  | EmployeeErrorValidation<T>
  | EmployeeErrorOperation;

export const createError = <T>(errorInfo: ErrorStructures<T>) => {
  switch (errorInfo.entityError) {
    case EEntityNames.User:
      return userErrorHandler(errorInfo);
    case EEntityNames.Employee:
      return employeeErrorHandler(errorInfo);
    default:
      return buildUnknownError(`Unknown error on ${createError.name} when classificating ${JSON.stringify(errorInfo)}`);
  }
};

export const buildValidationError = <T>(validationError: UserErrorValidation<T> | EmployeeErrorValidation<T>) =>
  buildResponseError(ResponseStatus.ERROR, validationError);

export const buildErrorOperation = (operationError: UserErrorOperation | ErrorLogOperation | EmployeeErrorOperation) =>
  buildResponseError(ResponseStatus.ERROR, operationError);

export const buildUnknownError = (message: string) =>
  buildResponseError(ResponseStatus.INTERNAL_ERROR, {
    code: 500,
    message,
  });

const buildResponseError = <T>(
  status: ResponseStatus,
  error: ErrorStructures<T> | { code: number; message: string }
) => ({
  status,
  error,
});
