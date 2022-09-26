import { DBProperties } from "./errorLogEnum";

export interface IErrorLog {
  [DBProperties.id]: number | undefined;
  [DBProperties.entityError]: string;
  [DBProperties.message]: string;
  [DBProperties.origin]: string;
  [DBProperties.time]: Date;
  [DBProperties.data]: string;
  [DBProperties.sql]: string;
}

export default class ErrorLog implements IErrorLog {
  id: number | undefined;
  entityError: string;
  message: string;
  origin: string;
  time: Date;
  data: string;
  sql: string;

  constructor(entityError: string, message: string, origin: string, time: Date, data: string, sql: string) {
    this.entityError = entityError;
    this.message = message;
    this.origin = origin;
    this.time = time;
    this.data = data;
    this.sql = sql;
  }
}
