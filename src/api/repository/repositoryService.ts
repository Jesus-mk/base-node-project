import { MysqlError, QueryOptions } from "mysql";
import { sqlBuilder } from ".";
import { configService } from "../../config";
import { logErrorService } from "../entity/errorLog";
import ErrorLog from "../entity/errorLog/ErrorLog";
import { repositoryTools } from "../tools";
import { EErrorCodes, Reason } from "../tools/error/errorEnum";
import { IError } from "../tools/error/errorInterface";
import { joinSearch, searchFilters } from "../tools/interfaceTools";
import { EEntityNames } from "./enum";

const connection = configService.mysqlConnection();

export const getAll = <T>(entityName: string) =>
  new Promise<T[]>((resolve: (value: T[]) => void, reject: (err: IError) => void) => {
    const sql = connection.format(sqlBuilder.getAll(), [entityName]);

    console.info(getAll.name);
    console.info(sql);

    connection.query(sql, [entityName], async (error, result: T[]) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog(entityName, error, sql, getAll.name, "");
        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else if (!result.length) reject({ code: EErrorCodes.Null, message: Reason.NOT_FOUND });
      else resolve(result);
    });
  });

export const getOneById = <T>(entityName: string, id: number) =>
  new Promise<T>((resolve: (value: T) => void, reject: (err: IError) => void) => {
    const sql = connection.format(sqlBuilder.getOneById(), [entityName, id]);

    console.info(getOneById.name);
    console.info(sql);

    connection.query(sql, async (error: MysqlError | null, result: T[]) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog(entityName, error, sql, getOneById.name, "");

        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else if (!result.length) reject({ code: EErrorCodes.Null, message: Reason.NOT_FOUND });
      else resolve(result[0]);
    });
  });

export const getOneByProperty = <T>(entityName: string, property: keyof T, value: string) =>
  new Promise<T>((resolve: (value: T) => void, reject: (err: IError) => void) => {
    const escapedValue = connection.escape(`%${value}%`);
    const sql = connection.format(sqlBuilder.getOneByProperty(escapedValue), [entityName, property]);

    console.info(getOneByProperty.name);
    console.info(sql);

    connection.query(sql, async (error: MysqlError | null, result: T[]) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog(entityName, error, sql, getOneByProperty.name, "");

        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else if (!result.length) reject({ code: EErrorCodes.Null, message: Reason.NOT_FOUND });
      else resolve(result[0]);
    });
  });

export const getOneByPropertyMultiple = <T>(entityName: string, searchFilter: searchFilters<T>[]) =>
  new Promise<T[]>((resolve: (value: T[]) => void, reject: (err: IError) => void) => {
    const sqlValuesToFormat = repositoryTools.createListToFormatFromFilter(entityName, searchFilter);
    const filterWithEscapedValues = repositoryTools.escapeValuesFromFilters<T>(connection, searchFilter);

    const sql = connection.format(sqlBuilder.getOneByPropertyMultiple<T>(filterWithEscapedValues), sqlValuesToFormat);

    console.info(getOneByPropertyMultiple.name);
    console.info(sql);

    connection.query(sql, async (error: MysqlError | null, result: T[]) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog(entityName, error, sql, getOneByProperty.name, "");

        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else if (!result.length) reject({ code: EErrorCodes.Null, message: Reason.NOT_FOUND });
      else resolve(result);
    });
  });

export const insertOne = <T, R>(entityName: EEntityNames, insertData: T) =>
  new Promise<R>((resolve: (value: R) => void, reject: (err: IError) => void) => {
    const sql = connection.format(sqlBuilder.insert(), [entityName, insertData]);

    console.info(insertOne.name);
    console.info(sql);

    connection.query(sql, async (error, result) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog(
          entityName,
          error,
          sql,
          insertOne.name,
          JSON.stringify(insertData)
        );

        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else getOneById<R>(entityName, result.insertId).then(resolve).catch(reject);
    });
  });

export const updateOne = <T, R>(entityName: EEntityNames, updateData: T, id: number) =>
  new Promise<R>((resolve: (value: R) => void, reject: (err: IError) => void) => {
    const sql = connection.format(sqlBuilder.update(), [entityName, updateData, id]);

    console.info(updateOne.name);
    console.info(sql);

    connection.query(sql, async (error, result) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog(
          entityName,
          error,
          sql,
          insertOne.name,
          JSON.stringify(updateData)
        );

        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else if (!result.affectedRows) reject({ code: EErrorCodes.Null, message: Reason.NOT_FOUND });
      else getOneById<R>(entityName, result.insertId).then(resolve).catch(reject);
    });
  });

export const deleteOneById = (entityName: string, id: number) =>
  new Promise<number>((resolve, reject: (err: IError) => void) => {
    const sql = connection.format(sqlBuilder.deleteOneById(), [entityName, id]);

    console.info(deleteOneById.name);
    console.info(sql);

    connection.query(sql, async (error, result) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog(entityName, error, sql, insertOne.name, "");

        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else if (!result.affectedRows) reject({ code: EErrorCodes.Null, message: Reason.NOT_FOUND });
      else resolve(id);
    });
  });

export const insertErrorLog = (errorLog: ErrorLog) =>
  new Promise<number>((resolve) => {
    const sql = connection.format(sqlBuilder.insert(), [EEntityNames.Error_log, errorLog]);

    console.info(insertErrorLog.name);
    console.info(sql);

    connection.query(sql, async (error, result) => {
      if (error) resolve(0);
      else resolve(result.insertId);
    });
  });

/**
 Creates a Join SQL between two entities and returns both under a custom label.
 Right now the function accepts an array but it is not working with multiple joins.

 It returns both entities given the values of @Param R

 @Return Record<R, T | Y>
 */
export const getOneByJoin = <T, Y, R extends string>(joinEntities: joinSearch<T, Y>[]) =>
  new Promise<Record<R, T | Y>>((resolve: (value: any) => void, reject: (err: IError) => void) => {
    const joinValuesToFormat = repositoryTools.createListToFormatJoin(joinEntities);
    const notFormatSql = sqlBuilder.getOneByJoin(joinEntities);

    const sql = connection.format(notFormatSql, joinValuesToFormat);

    console.info(getOneByJoin.name);
    console.info(sql);

    const options: QueryOptions = { sql, nestTables: true };
    connection.query(options, async (error: MysqlError | null, result: (T | Y)[]) => {
      if (error) {
        const errorId = await logErrorService.createErrorLog("JOIN", error, sql, getOneById.name, ""); // TODO Find a way to change entityName

        reject({ errorId, code: EErrorCodes.Null, message: error.sqlMessage || "" });
      } else if (!result.length) reject({ code: EErrorCodes.Null, message: Reason.NOT_FOUND });
      else resolve(JSON.parse(JSON.stringify(result[0])));
    });
  }); // TODO Evaluate if this really needs to be able to concat multiple joins.
