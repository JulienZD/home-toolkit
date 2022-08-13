<script lang="ts">
  import { type NotificationOptions, useNotifications } from '$lib/hooks/useNotifications';
  import { onDestroy, onMount } from 'svelte';

  const notificationFns = useNotifications();

  type NotificationFn = keyof typeof notificationFns;

  // Inspired by https://github.com/mantinedev/mantine/blob/master/src/mantine-utils/src/create-use-external-events/create-use-external-events.ts
  const notificationFnNames = Object.keys(notificationFns) as NotificationFn[];

  const handlers = Object.fromEntries(
    notificationFnNames.map((eventKey) => {
      return [eventKey, (event: CustomEvent) => void notificationFns[eventKey](event.detail as NotificationOptions)];
    })
  ) as unknown as Record<NotificationFn, EventListenerOrEventListenerObject>;

  onMount(() => {
    if (typeof window !== 'undefined') {
      notificationFnNames.forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
        window.addEventListener(eventKey, handlers[eventKey]);
      });
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      notificationFnNames.forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
      });
    }
  });
</script>

<slot />
