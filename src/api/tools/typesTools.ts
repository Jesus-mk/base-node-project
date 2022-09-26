/* 
Type to obtain the nested keys of an object as "key.keyChild...."
Important, never use with self reference Objects.
*/
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: NestedKeyType<ObjectType, Key>;
}[keyof ObjectType & (string | number)];

type NestedKeyType<
  ObjectType extends object,
  Key extends keyof ObjectType & (string | number)
> = ObjectType[Key] extends object ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : `${Key}`;

export type lengthValuesOfKey<T> = {
  [key in keyof T]?: { minLength: number; maxLength: number };
};
