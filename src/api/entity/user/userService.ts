import { repositoryService } from "../../repository";
import { EEntityNames } from "../../repository/enum";
import { errorBuilder, responseBuilder } from "../../tools";
import { EErrorCodes, ErrorClassification } from "../../tools/error/errorEnum";
import { IError } from "../../tools/error/errorInterface";
import { ResponseStatus, searchFilters } from "../../tools/interfaceTools";
import User, { IUser } from "./User";

export const findAll = () =>
  repositoryService
    .getAll<IUser>(EEntityNames.User)
    .then((value) => {
      return responseBuilder.buildResponse<IUser>(ResponseStatus.OK, 200, value);
    })
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.User>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_FindAll,
        entityError: EEntityNames.User,
      });
    });

export const findById = (idToFind: number) =>
  repositoryService
    .getOneById<IUser>(EEntityNames.User, idToFind)
    .then((value) => {
      return responseBuilder.buildResponse<IUser>(ResponseStatus.OK, 200, value);
    })
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.User>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Find,
        entityError: EEntityNames.User,
        search: idToFind,
      });
    });

export const findByPorperty = (property: keyof IUser, search: string) =>
  repositoryService
    .getOneByProperty<IUser>(EEntityNames.User, property, search)
    .then((value) => {
      return responseBuilder.buildResponse<IUser>(ResponseStatus.OK, 200, value);
    })
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.User>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Find,
        entityError: EEntityNames.User,
        search: search,
      });
    });

export const findByFilter = <IUser>(search: searchFilters<IUser>[]) =>
  repositoryService
    .getOneByPropertyMultiple<IUser>(EEntityNames.User, search)
    .then((value) => {
      return responseBuilder.buildResponse<IUser>(ResponseStatus.OK, 200, value);
    })
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.User>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Find,
        entityError: EEntityNames.User,
        search,
      });
    });

export const create = (userToInsert: User) =>
  repositoryService
    .insertOne<IUser, User>(EEntityNames.User, userToInsert)
    .then((value) => responseBuilder.buildResponse<IUser>(ResponseStatus.CREATED, 200, value))
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.User>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.OP_Create,
        entityError: EEntityNames.User,
        insertedValue: userToInsert,
      });
    });

export const update = (userToUpdate: User, userId: number) =>
  repositoryService
    .updateOne<IUser, User>(EEntityNames.User, userToUpdate, userId)
    .then((value) => {
      return responseBuilder.buildResponse<IUser>(ResponseStatus.UPDATED, 200, value);
    })
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.User>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.Op_Update,
        entityError: EEntityNames.User,
        updatedValue: userToUpdate,
      });
    });

export const deleteById = (idToDelete: number) =>
  repositoryService
    .deleteOneById(EEntityNames.User, idToDelete)
    .then((value) => {
      return responseBuilder.buildResponse(ResponseStatus.DELETED, 200, value);
    })
    .catch((error: IError) => {
      return errorBuilder.createError<EEntityNames.User>({
        ...error,
        classification: ErrorClassification.Operation,
        type: EErrorCodes.Op_Delete,
        entityError: EEntityNames.User,
        idToDelete,
      });
    });
