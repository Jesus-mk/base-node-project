import { DBProperties } from "./userEnum";

type lenghValuesOfUserValues = {
  [key in DBProperties]?: { minLength: number; maxLength: number } | undefined;
};

export namespace UserValidationValues {
  export const lenghValues: lenghValuesOfUserValues = {
    [DBProperties.email]: { minLength: 3, maxLength: 24 },
    [DBProperties.password]: { minLength: 3, maxLength: 24 },
  };
}
