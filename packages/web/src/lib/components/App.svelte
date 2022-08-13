<script lang="ts">
  import { QueryClientProvider } from '@sveltestack/svelte-query';
  import { queryClient } from '$lib/api/client';
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
