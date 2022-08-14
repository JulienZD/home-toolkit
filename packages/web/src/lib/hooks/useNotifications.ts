import { getNotificationsContext } from 'svelte-notifications';

export interface NotificationOptions {
  /** The notification title */
  title: string;

  /**
   * The notification body
   * @note Not currently supported
   */
  body?: string;

  /**
   * Position on screen the notification appears at
   * @default 'bottom-right'
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  /**
   * The notification type
   * @default 'success'
   */
  type?: 'success' | 'warning' | 'danger';
}

/**
 * Basic notification system interface made after {@link https://mantine.dev/others/notifications @mantine/notifications}
 * in preparation for SvelteUI's notification system
 */
export const useNotifications = () => {
  const notifications = getNotificationsContext();

  if (!notifications) {
    console.error(notifications);
    throw new Error('useNotifications was used outside of Notifications, did you provide it?');
  }

  const showNotification = (options: NotificationOptions) => {
    const { title: text, ...otherOptions } = options;

    notifications.addNotification({
      text,
      title: options.title,
      type: 'success',
      removeAfter: 5000,
      position: 'bottom-right',
      ...otherOptions,
    });
  };

  const noop = (fn: string) => (options: NotificationOptions) => {
    import.meta.env.DEV && console.debug(fn, options);
  };

  return {
    showNotification,
    // update and hide don't currently do anything
    updateNotification: noop('updateNotification'),
    hideNotification: noop('hideNotification'),
  };
};
