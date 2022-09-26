export enum Reason {
  NOT_FOUND = "Not found",
}

export enum ErrorClassification {
  Operation = "Operation",
  Validation = "Validation",
}

export enum EErrorCodes {
  Null,
  OP_Find,
  OP_FindAll,
  OP_Create,
  Op_Update,
  Op_Delete,
  VAL_MinValue,
  VAL_MaxValue,
  VAL_NullProperty,
  VAL_NotValidEmail,
  VAL_UniqueValue,
  VAL_NotFound,
}
