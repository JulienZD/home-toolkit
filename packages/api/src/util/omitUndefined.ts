type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

/**
 * Strips a (clone of) an object of undefined values by omitting their keys entirely.
 * @returns A clone of the object, without any keys that had `undefined` as their value
 */
export const omitUndefined = <T>(object: T): NoUndefinedField<T> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(object).filter(([_, value]) => value !== undefined)) as NoUndefinedField<T>;
};
