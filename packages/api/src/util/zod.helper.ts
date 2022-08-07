import { z } from 'zod';

/**
 * Date string or {@link Date} instance
 */
export const zDateSchema = z.preprocess((val) => {
  if (typeof val === 'string' || val instanceof Date) {
    return new Date(val);
  }

  return val;
}, z.date());
