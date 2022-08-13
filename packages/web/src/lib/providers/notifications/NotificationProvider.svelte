<script lang="ts">
  import NotificationHandler from './NotificationHandler.svelte';
  import Notifications from 'svelte-notifications';
</script>

<Notifications>
  <NotificationHandler>
    <slot />
  </NotificationHandler>
</Notifications>
