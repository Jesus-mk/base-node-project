import { joinSearch, searchFilters } from "../tools/interfaceTools";

export const getAll = () => `SELECT * FROM ??`;

export const getOneById = () => `SELECT * FROM ?? WHERE id = ?`;

/* SearchValue must be escaped before using this function,
the reason behind not using '?' is because I couldnt find a way
to build the next sintax:
... WHERE ?? LIKE %?%
Using '?' would end up giving me the next sintax, creating an error:
... WHERE ?? LIKE %'anySearchValue'%
*/
export const getOneByProperty = (escapedValue: string) => `SELECT * FROM ?? WHERE ?? LIKE ${escapedValue}`;

/* 
Concats the SQL by using an searchFilter object list.
For each item Its going to concat the SQL operators, the column name and the search value.
On the first iteration of the filters just the search value is added.

I havent found a way to safelly escape the concatenation of the operators "and" & "or",
if used as "?" or "??" single quotes are added, making the sql sintax invalid.
If there isnt a match the value will be undefined giving a sintax error.

The actual value to search should already be escaped, the reason why i didnt use '?' is
because I was unable to find a way to build the next SQL sentence:
... WHERE ?? LIKE %?%
Quotes would be added leaving the sentence like the following, making a sintax error:
... WHERE ?? LIKE %'anySearchValue'%
*/
export const getOneByPropertyMultiple = <T>(searchFilter: searchFilters<T>[]) => {
  let sql = `SELECT * FROM ?? WHERE ?? LIKE `;

  searchFilter.forEach((search, i) => {
    let concat;
    if (search.concat === "and" || search.concat === "or") concat = search.concat;

    if (i === 0) sql = sql.concat(`${search.value}`);
    else sql = sql.concat(` ${concat} ?? LIKE ${search.value}`);
  });
  return sql;
};

export const insert = () => `INSERT INTO ?? SET ?`;

export const update = () => `UPDATE ?? SET ? WHERE id = ?`;

export const deleteOneById = () => `DELETE FROM ?? WHERE id = ?`;

/**
 * Creates the SQL estructure from a joinList resulting on the next format:
 * `SELECT * FROM ?? ${joinType} JOIN ?? ON ${firstEntityName}.${firstProperty} = ${secondEntityName}.${secondProperty}`
 */
export const getOneByJoin = <T, Y>(joinSearch: joinSearch<T, Y>[]) => {
  let sql = `SELECT * FROM ??`;

  joinSearch.forEach((join) => {
    sql = sql.concat(
      ` ${join.joinType} JOIN ?? ON ${join.firstEntityName}.${join.firstProperty} = ${join.secondEntityName}.${join.secondProperty}`
    );
  });
  return sql;
}; // TODO Make this function able to concat multiple Joins
