import { errorBuilder } from "../../tools";
import { ErrorClassification, EErrorCodes } from "../../tools/error/errorEnum";
import { EmployeeErrorOperation, EmployeeErrorValidation } from "./employeeInterface";

type ErrorStructures<T> = EmployeeErrorValidation<T> | EmployeeErrorOperation;

export const employeeErrorHandler = <T>(errorInfo: ErrorStructures<T>) => {
  switch (errorInfo.classification) {
    case ErrorClassification.Validation:
      return getEmployeeValidationError(errorInfo);
    case ErrorClassification.Operation:
      return getEmployeeOperationError(errorInfo);
    default:
      return errorBuilder.buildUnknownError(
        `Unknown error on ${employeeErrorHandler.name} when classificating ${JSON.stringify(errorInfo)}`
      );
  }
};

const getEmployeeValidationError = <T>(errorInfo: EmployeeErrorValidation<T>) => {
  switch (errorInfo.type) {
    case EErrorCodes.Null:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: "Null",
        keyToValidate: errorInfo.keyToValidate,
      });
    case EErrorCodes.VAL_MinValue:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: `Property ${errorInfo.keyToValidate.toString()} must be atleast ${errorInfo.minValue} characters`,
        keyToValidate: errorInfo.keyToValidate,
      });
    case EErrorCodes.VAL_MaxValue:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: `Property ${errorInfo.keyToValidate.toString()} must be less than ${errorInfo.maxValue} characters`,
        keyToValidate: errorInfo.keyToValidate,
      });
    case EErrorCodes.VAL_NullProperty:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: `Property ${errorInfo.keyToValidate.toString()} cannot be null`,
        keyToValidate: errorInfo.keyToValidate,
      });
    case EErrorCodes.VAL_NotValidEmail:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: `Property ${errorInfo.value} is not a valid email`,
        keyToValidate: errorInfo.keyToValidate,
      });
    case EErrorCodes.VAL_UniqueValue:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: `Property ${errorInfo.value} already exist`,
        keyToValidate: errorInfo.keyToValidate,
      });
    default:
      return errorBuilder.buildUnknownError(
        `Unknown error on ${getEmployeeValidationError.name} when classificating ${JSON.stringify(errorInfo)}`
      );
  }
};

const getEmployeeOperationError = (errorInfo: EmployeeErrorOperation) => {
  switch (errorInfo.type) {
    case EErrorCodes.OP_Find:
      return errorBuilder.buildErrorOperation(errorInfo);
    case EErrorCodes.OP_FindAll:
      return errorBuilder.buildErrorOperation(errorInfo);
    case EErrorCodes.OP_Create:
      return errorBuilder.buildErrorOperation(errorInfo);
    case EErrorCodes.Op_Update:
      return errorBuilder.buildErrorOperation(errorInfo);
    case EErrorCodes.Op_Delete:
      return errorBuilder.buildErrorOperation(errorInfo);
    default:
      return errorBuilder.buildUnknownError(
        `Unknown error on ${getEmployeeOperationError.name} when classificating ${JSON.stringify(errorInfo)}`
      );
  }
};
