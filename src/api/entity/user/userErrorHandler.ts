import { errorBuilder } from "../../tools";
import { ErrorClassification, EErrorCodes } from "../../tools/error/errorEnum";

import { UserErrorOperation, UserErrorValidation } from "./userInterface";

type ErrorStructures<T> = UserErrorValidation<T> | UserErrorOperation;

export const userErrorHandler = <T>(errorInfo: ErrorStructures<T>) => {
  switch (errorInfo.classification) {
    case ErrorClassification.Validation:
      return getUserValidationError(errorInfo);
    case ErrorClassification.Operation:
      return getUserOperationError(errorInfo);
    default:
      return errorBuilder.buildUnknownError(
        `Unknown error on ${userErrorHandler.name} when classificating ${JSON.stringify(errorInfo)}`
      );
  }
};

const getUserValidationError = <T>(errorInfo: UserErrorValidation<T>) => {
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
    case EErrorCodes.VAL_UniqueValue:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: `Property ${errorInfo.value} already exist`,
        keyToValidate: errorInfo.keyToValidate,
      });
    case EErrorCodes.VAL_NotFound:
      return errorBuilder.buildValidationError<T>({
        ...errorInfo,
        message: `Employee with id ${errorInfo.value} doesn't exist`,
        keyToValidate: errorInfo.keyToValidate,
      });
    default:
      return errorBuilder.buildUnknownError(
        `Unknown error on ${getUserValidationError.name} when classificating ${JSON.stringify(errorInfo)}`
      );
  }
};

const getUserOperationError = (errorInfo: UserErrorOperation) => {
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
        `Unknown error on ${getUserOperationError.name} when classificating ${JSON.stringify(errorInfo)}`
      );
  }
};
