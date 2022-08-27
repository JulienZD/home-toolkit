class SmartLightError extends Error {}

class LightNotFoundError extends SmartLightError {
  constructor() {
    super('Light not found');
  }
}

export { SmartLightError, LightNotFoundError };
