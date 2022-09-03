/**
 * Determines the user's geolocation via the Geolocation API.
 *
 * @returns The geolocation position
 * @throws When the Geolocation API isn't available, or the location couldn't be determined
 */
export const getGeolocation = async (): Promise<GeolocationPosition> => {
  if (!('geolocation' in navigator)) {
    throw new Error('Geolocation API not available');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, () => {
      reject(new Error('Unable to determine location'));
    });
  });
};
