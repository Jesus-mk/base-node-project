import { EEntityNames } from "../../repository/enum";
import { EErrorCodes } from "../../tools/error/errorEnum";
import { BaseOperation } from "../../tools/error/errorInterface";

interface BaseOperationLogError extends BaseOperation {
  entityError: EEntityNames.Error_log;
  errorId: number;
  code: number;
}

interface ErrorFind extends BaseOperationLogError {
  type: EErrorCodes.OP_Find;
  search: number;
}

interface ErrorFindAll extends BaseOperationLogError {
  type: EErrorCodes.OP_FindAll;
}

interface ErrorInsert extends BaseOperationLogError {
  type: EErrorCodes.OP_Create;
  insertedValue: any;
}

interface ErrorUpdate extends BaseOperationLogError {
  type: EErrorCodes.Op_Update;
  updatedValue: any;
}

interface ErrorDelete extends BaseOperationLogError {
  type: EErrorCodes.Op_Delete;
  idToDelete: number;
}

export type ErrorLogOperation = ErrorFind | ErrorFindAll | ErrorInsert | ErrorUpdate | ErrorDelete;
