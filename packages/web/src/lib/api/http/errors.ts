import { HTTPError, type NormalizedOptions } from 'ky';

interface ApiValidationErrorData {
  fieldErrors: Record<string, string[]>;
  [key: string]: unknown;
}

export class ApiValidationError extends HTTPError {
  public status: 400 | 422;

  constructor(
    public data: ApiValidationErrorData,
    httpParams: { response: Response; request: Request; options: NormalizedOptions }
  ) {
    super(httpParams.response, httpParams.request, httpParams.options);

    this.status = httpParams.response.status as 400 | 422;
    this.message = 'Validation errors occurred';
  }
}
