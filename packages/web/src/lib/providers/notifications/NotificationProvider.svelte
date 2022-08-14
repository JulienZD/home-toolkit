<script lang="ts">
  import NotificationHandler from './NotificationHandler.svelte';
  import Notifications from 'svelte-notifications';
  import _CustomNotification from './CustomNotification.svelte';

  const CustomNotification = _CustomNotification as never;
</script>

<Notifications item={CustomNotification}>
  <NotificationHandler>
    <slot />
  </NotificationHandler>
</Notifications>
