import { ResponseStatus } from "./interfaceTools";

export const buildResponse = <T>(status: ResponseStatus, code: number, data: T | T[] | Record<string, unknown>) => {
  return {
    status,
    code,
    data,
  };
};
