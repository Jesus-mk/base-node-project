import { errorBuilder } from ".";
import { repositoryEnum } from "../repository";
import { EEntityNames } from "../repository/enum";
import { createError } from "./error/errorBuilder";
import { EErrorCodes, ErrorClassification } from "./error/errorEnum";
import { ResponseStatus } from "./interfaceTools";
import { lengthValuesOfKey } from "./typesTools";

type entityEnums = EEntityNames.User | EEntityNames.Employee;

const getEntity = <T extends object>(objToValidate: T): entityEnums => {
  switch (objToValidate.constructor.name.toLowerCase()) {
    case repositoryEnum.EEntityNames.User:
      return EEntityNames.User;
    case repositoryEnum.EEntityNames.Employee:
      return EEntityNames.Employee;
    default:
      throw errorBuilder.buildUnknownError(
        `Error on ${getEntity.name}, ${objToValidate.constructor.name} is not a valid entity name`
      );
  }
};

const obtainValueAsString = <T>(objToValidate: T, keyToValidate: keyof T, functioName: string) => {
  if (typeof objToValidate[keyToValidate] === "string") return objToValidate[keyToValidate] as unknown as string;
  else throw errorBuilder.buildUnknownError(`Error on ${functioName}, ${keyToValidate.toString()} is not a String`);
};

export const checkNullProperties = <T extends object>(objToValidate: T, keyToValidate: keyof T) => {
  if (!objToValidate[keyToValidate])
    throw createError<T>({
      classification: ErrorClassification.Validation,
      entityError: getEntity(objToValidate),
      type: EErrorCodes.VAL_NullProperty,
      keyToValidate,
    });
};

export const checkPropertyStringLenght = <T extends object>(
  objToValidate: T,
  keyToValidate: keyof T,
  lengthValues: lengthValuesOfKey<T>
) => {
  const minValue = lengthValues[keyToValidate]?.minLength;
  const maxValue = lengthValues[keyToValidate]?.maxLength;
  const stringValue = obtainValueAsString(objToValidate, keyToValidate, checkPropertyStringLenght.name);

  if (!minValue || !maxValue)
    throw errorBuilder.buildUnknownError(
      `Error on ${checkPropertyStringLenght.name}, ${keyToValidate.toString()} does not have min or max value. ${
        lengthValues[keyToValidate]
      }`
    );

  if (minValue && stringValue.length < minValue)
    throw createError<T>({
      classification: ErrorClassification.Validation,
      entityError: getEntity(objToValidate),
      type: EErrorCodes.VAL_MinValue,
      keyToValidate,
      minValue,
      value: stringValue,
    });

  if (maxValue && stringValue.length > maxValue)
    throw createError<T>({
      classification: ErrorClassification.Validation,
      entityError: getEntity(objToValidate),
      type: EErrorCodes.VAL_MaxValue,
      keyToValidate,
      maxValue,
      value: stringValue,
    });
};

export const checkPropertyByRegrex = <T extends Object>(objToValidate: T, keyToValidate: keyof T, regrex: RegExp) => {
  const stringValue = obtainValueAsString(objToValidate, keyToValidate, checkPropertyByRegrex.name);
  console.log(stringValue);

  if (!stringValue.toLowerCase().match(regrex))
    throw createError<T>({
      classification: ErrorClassification.Validation,
      entityError: getEntity(objToValidate),
      type: EErrorCodes.VAL_NotValidEmail,
      keyToValidate,
      value: stringValue,
    });
};

export const checkExistingValue = <T extends Object>(
  objToValidate: T,
  keyToValidate: keyof T,
  status: ResponseStatus,
  throwIf: "Duplicated" | "Not Found"
) => {
  const stringValue = obtainValueAsString(objToValidate, keyToValidate, checkPropertyStringLenght.name);
  const validStatus = throwIf === "Duplicated" ? ResponseStatus.OK : ResponseStatus.ERROR;
  const type = throwIf === "Duplicated" ? EErrorCodes.VAL_UniqueValue : EErrorCodes.VAL_NotFound;

  if (status === validStatus)
    throw createError<T>({
      classification: ErrorClassification.Validation,
      entityError: getEntity(objToValidate),
      type: type,
      keyToValidate,
      value: stringValue,
    });
};
