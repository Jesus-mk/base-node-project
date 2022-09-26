import { EEntityNames } from "../../repository/enum";
import { EErrorCodes } from "../../tools/error/errorEnum";
import { BaseOperation, BaseValidation } from "../../tools/error/errorInterface";

interface BaseValidationUser<T> extends BaseValidation<T> {
  entityError: EEntityNames.User;
  message?: string;
}

interface NullValue<T> extends BaseValidationUser<T> {
  type: EErrorCodes.Null;
}

interface MinValue<T> extends BaseValidationUser<T> {
  type: EErrorCodes.VAL_MinValue;
  minValue: number;
  value: string;
}

interface MaxValue<T> extends BaseValidationUser<T> {
  type: EErrorCodes.VAL_MaxValue;
  maxValue: number;
  value: string;
}

interface NullProperty<T> extends BaseValidationUser<T> {
  type: EErrorCodes.VAL_NullProperty;
}

interface ValidEmail<T> extends BaseValidationUser<T> {
  type: EErrorCodes.VAL_NotValidEmail;
  value: string;
}

interface UniqueValue<T> extends BaseValidationUser<T> {
  type: EErrorCodes.VAL_UniqueValue;
  value: string;
}

interface NotFound<T> extends BaseValidationUser<T> {
  type: EErrorCodes.VAL_NotFound;
  value: string;
}

export type UserErrorValidation<T> =
  | NullValue<T>
  | MinValue<T>
  | MaxValue<T>
  | NullProperty<T>
  | ValidEmail<T>
  | UniqueValue<T>
  | NotFound<T>;

interface BaseOperationUser extends BaseOperation {
  entityError: EEntityNames.User;
  errorId?: number;
  code: number;
}

interface ErrorFind extends BaseOperationUser {
  type: EErrorCodes.OP_Find;
  search: any;
}

interface ErrorFindAll extends BaseOperationUser {
  type: EErrorCodes.OP_FindAll;
}

interface ErrorInsert extends BaseOperationUser {
  type: EErrorCodes.OP_Create;
  insertedValue: Record<string, any>;
}

interface ErrorUpdate extends BaseOperationUser {
  type: EErrorCodes.Op_Update;
  updatedValue: Record<string, any>;
}

interface ErrorDelete extends BaseOperationUser {
  type: EErrorCodes.Op_Delete;
  idToDelete: number;
}

export type UserErrorOperation = ErrorFind | ErrorFindAll | ErrorInsert | ErrorUpdate | ErrorDelete;
