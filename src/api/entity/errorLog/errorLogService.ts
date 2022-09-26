import { MysqlError } from "mysql";
import { repositoryService } from "../../repository";
import ErrorLog from "./ErrorLog";

export const createErrorLog = (
  column: string,
  error: MysqlError,
  sql: string,
  functionName: string,
  data: string
): Promise<number> => {
  const errorLog = new ErrorLog(column, error.message, functionName, new Date(), data, sql);

  return repositoryService.insertErrorLog(errorLog);
};
