import type { NotificationOptions } from '$lib/hooks/useNotifications';
import { custom_event } from 'svelte/internal';

/** Display a notification */
export const showNotification = (options: NotificationOptions) => {
  dispatchEvent(custom_event('showNotification', options));
};

/** Hide a notification */
export const hideNotification = (options: NotificationOptions) => {
  dispatchEvent(custom_event('hideNotification', options));
};

/** Update a currently visible notification */
export const updateNotification = (options: NotificationOptions) => {
  dispatchEvent(custom_event('updateNotification', options));
};
