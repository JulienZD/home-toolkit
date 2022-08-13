interface ApiBadRequestError {
  fieldErrors: Record<string, string[]>;
}

export const isApiBadRequestResponse = (value: unknown): value is ApiBadRequestError => {
  return (
    value !== null &&
    typeof value === 'object' &&
    'fieldErrors' in value &&
    typeof (value as ApiBadRequestError).fieldErrors === 'object'
  );
};
