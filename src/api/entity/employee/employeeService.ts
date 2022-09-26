import { repositoryService } from "../../repository";
import { EEntityNames } from "../../repository/enum";
import { getOneByJoin } from "../../repository/repositoryService";
import { errorBuilder, responseBuilder } from "../../tools";
import { EErrorCodes, ErrorClassification } from "../../tools/error/errorEnum";
import { IError } from "../../tools/error/errorInterface";
import { joinSearch, ResponseStatus, searchFilters } from "../../tools/interfaceTools";
import { IUser } from "../user/User";
import { DBProperties } from "../user/userEnum";
import Employee, { IEmployee } from "./Employee";
import { DBProperties as DBEmployee } from "./employeeEnum";

export const findAll = () =>
  repositoryService
    .getAll<IEmployee>(EEntityNames.Employee)
    .then((value) => responseBuilder.buildResponse<IEmployee>(ResponseStatus.OK, 200, value)) // TODO This method should always return an []
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_FindAll,
        entityError: EEntityNames.Employee,
      });
    });

export const findById = (idToFind: number) =>
  repositoryService
    .getOneById<IEmployee>(EEntityNames.Employee, idToFind)
    .then((value) => responseBuilder.buildResponse<IEmployee>(ResponseStatus.OK, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Find,
        entityError: EEntityNames.Employee,
        search: idToFind,
      });
    });

export const findByProperty = (property: keyof IEmployee, search: string) =>
  repositoryService
    .getOneByProperty<IEmployee>(EEntityNames.Employee, property, search)
    .then((value) => responseBuilder.buildResponse<IEmployee>(ResponseStatus.OK, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Find,
        entityError: EEntityNames.Employee,
        search: search,
      });
    });

export const findByFilter = <IEmployee>(search: searchFilters<IEmployee>[]) =>
  repositoryService
    .getOneByPropertyMultiple<IEmployee>(EEntityNames.Employee, search)
    .then((value) => responseBuilder.buildResponse<IEmployee>(ResponseStatus.OK, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Find,
        entityError: EEntityNames.Employee,
        search,
      });
    });

export const create = (dataToInsert: Employee) =>
  repositoryService
    .insertOne<Employee, IEmployee>(EEntityNames.Employee, dataToInsert)
    .then((value) => responseBuilder.buildResponse<IEmployee>(ResponseStatus.CREATED, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Create,
        entityError: EEntityNames.Employee,
        insertedValue: dataToInsert, // TODO Rename this property, the values was not inserted
      });
    });

export const update = (dataToUpdate: Employee, employeeId: number) =>
  repositoryService
    .updateOne<Employee, IEmployee>(EEntityNames.Employee, dataToUpdate, employeeId)
    .then((value) => responseBuilder.buildResponse<IEmployee>(ResponseStatus.UPDATED, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.Op_Update,
        entityError: EEntityNames.Employee,
        updatedValue: dataToUpdate, // TODO Rename this property, the values was not updated
      });
    });

export const deleteById = (idToDelete: number) =>
  repositoryService
    .deleteOneById(EEntityNames.Employee, idToDelete)
    .then((value) => responseBuilder.buildResponse(ResponseStatus.DELETED, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.Op_Delete,
        entityError: EEntityNames.Employee,
        idToDelete,
      });
    });

export const getJoinUser = () => {
  const join: joinSearch<IEmployee, IUser> = {
    firstEntityName: EEntityNames.Employee,
    firstProperty: DBEmployee.id,
    joinType: "inner",
    secondEntityName: EEntityNames.User,
    secondProperty: DBProperties.idEmployee,
  };

  const joinArray: joinSearch<IEmployee, IUser>[] = [join];

  return getOneByJoin<IEmployee, IUser, "employee" | "user">(joinArray)
    .then((value) => responseBuilder.buildResponse<IEmployee>(ResponseStatus.OK, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.Employee>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Find,
        entityError: EEntityNames.Employee,
        search: joinArray,
      });
    }); // TODO this method has so many ramifications when returning, it probably needs its own DTO
};

export const test = () => {
  console.log("Test");
};
