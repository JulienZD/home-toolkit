<script lang="ts">
  import NotificationProvider from '$lib/providers/notifications/NotificationProvider.svelte';
  import { QueryClientProvider } from '@sveltestack/svelte-query';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { isDark } from '$lib/stores/theme';
  import { queryClient } from '$lib/api/client';
</script>

<SvelteUIProvider ssr withNormalizeCSS withGlobalStyles themeObserver={$isDark ? 'dark' : 'light'}>
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <slot />
    </NotificationProvider>
  </QueryClientProvider>
</SvelteUIProvider>
