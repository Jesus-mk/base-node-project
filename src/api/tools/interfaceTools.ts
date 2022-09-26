export enum ResponseStatus {
  OK = "ok",
  ERROR = "error",
  INTERNAL_ERROR = "internal error",
  CREATED = "created",
  UPDATED = "updated",
  DELETED = "deleted",
}

export type sqlOperators = "and" | "or";
export type findMode = "equal" | "contains" | "startWith" | "endWith";
export type searchFilters<T> = { key: Extract<keyof T, string>; value: string; concat: sqlOperators; mode: findMode };

export type joinSearch<T, Y> = {
  firstEntityName: string;
  firstProperty: Extract<keyof T, string>;
  joinType: "inner" | "left" | "right";
  secondEntityName: string;
  secondProperty: Extract<keyof Y, string>;
};
