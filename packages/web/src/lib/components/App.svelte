<script lang="ts">
  import NotificationProvider from '$lib/providers/notifications/NotificationProvider.svelte';
  import { QueryClientProvider } from '@sveltestack/svelte-query';
  import { queryClient } from '$lib/api/client';
</script>

<QueryClientProvider client={queryClient}>
  <NotificationProvider>
    <slot />
  </NotificationProvider>
</QueryClientProvider>
