import { EEntityNames } from "../../repository/enum";
import { EErrorCodes } from "../../tools/error/errorEnum";
import { BaseOperation, BaseValidation } from "../../tools/error/errorInterface";

interface BaseValidationEmployee<T> extends BaseValidation<T> {
  entityError: EEntityNames.Employee;
  message?: string;
}

interface NullValue<T> extends BaseValidationEmployee<T> {
  type: EErrorCodes.Null;
}

interface MinValue<T> extends BaseValidationEmployee<T> {
  type: EErrorCodes.VAL_MinValue;
  minValue: number;
  value: string;
}

interface MaxValue<T> extends BaseValidationEmployee<T> {
  type: EErrorCodes.VAL_MaxValue;
  maxValue: number;
  value: string;
}

interface NullProperty<T> extends BaseValidationEmployee<T> {
  type: EErrorCodes.VAL_NullProperty;
}

interface ValidEmail<T> extends BaseValidationEmployee<T> {
  type: EErrorCodes.VAL_NotValidEmail;
  value: string;
}

interface UniqueValue<T> extends BaseValidationEmployee<T> {
  type: EErrorCodes.VAL_UniqueValue;
  value: string;
}

interface NotFound<T> extends BaseValidationEmployee<T> {
  type: EErrorCodes.VAL_NotFound;
  value: string;
}

export type EmployeeErrorValidation<T> =
  | NullValue<T>
  | MinValue<T>
  | MaxValue<T>
  | NullProperty<T>
  | ValidEmail<T>
  | UniqueValue<T>
  | NotFound<T>;

interface BaseOperationEmployee extends BaseOperation {
  entityError: EEntityNames.Employee;
  errorId?: number;
  code: number;
}

interface ErrorFind extends BaseOperationEmployee {
  type: EErrorCodes.OP_Find;
  search: any;
}

interface ErrorFindAll extends BaseOperationEmployee {
  type: EErrorCodes.OP_FindAll;
}

interface ErrorInsert extends BaseOperationEmployee {
  type: EErrorCodes.OP_Create;
  insertedValue: Record<string, any>;
}

interface ErrorUpdate extends BaseOperationEmployee {
  type: EErrorCodes.Op_Update;
  updatedValue: Record<string, any>;
}

interface ErrorDelete extends BaseOperationEmployee {
  type: EErrorCodes.Op_Delete;
  idToDelete: number;
}

export type EmployeeErrorOperation = ErrorFind | ErrorFindAll | ErrorInsert | ErrorUpdate | ErrorDelete;
