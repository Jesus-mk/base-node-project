import { Connection } from "mysql";
import { errorBuilder } from ".";
import { joinSearch, searchFilters } from "./interfaceTools";

/**
 * Creates a pre formated SQL list with the entityName of the search and the keys to filter.
 * It always starts with the entityName and continues with the Keys of the searchFilter.
 */
export const createListToFormatFromFilter = <T>(entityName: string, searchFilter: searchFilters<T>[]) => {
  const sqlValuesToFormat: string[] = [entityName];
  searchFilter.forEach((filter) => sqlValuesToFormat.push(filter.key));
  return sqlValuesToFormat;
};

export const escapeValuesFromFilters = <T>(connection: Connection, searchFilter: searchFilters<T>[]) =>
  searchFilter.map((filter) => ({
    ...filter,
    value: connection.escape(getSearchMode(filter)),
  }));

const getSearchMode = <T>(filter: searchFilters<T>) => {
  switch (filter.mode) {
    case "equal":
      return `${filter.value}`;
    case "contains":
      return `%${filter.value}%`;
    case "startWith":
      return `${filter.value}%`;
    case "endWith":
      return `%${filter.value}`;
    default:
      throw errorBuilder.buildUnknownError(
        `Unknown error on ${getSearchMode.name} when classificating ${JSON.stringify(filter.mode)}`
      );
  }
};
/**
 * Generates an alias to use on the SQL
 */
export const generateAlias = <T, Y>(joinList: joinSearch<T, Y>[]) => {
  const alias: string[] = [];
  joinList.forEach((join, i) => {
    alias.push();
    alias.push(`${join.secondEntityName.slice(0, 3)}${i}`);
  });
  return alias;
}; // TODO No use until multiple JOINS are required. In any case, if no colums have the same name on the DB, it may not be needed.

/**
 * Extracts from a joinList the columns names to use at a pre formated SQL.
 */
export const createListToFormatJoin = <T, Y>(joinList: Required<joinSearch<T, Y>>[]) => {
  const joinValuesToFormat: string[] = [];
  joinList.forEach((join) => {
    joinValuesToFormat.push(join.firstEntityName);
    joinValuesToFormat.push(join.secondEntityName);
  });
  return joinValuesToFormat;
};
