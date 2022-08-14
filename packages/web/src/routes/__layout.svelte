<script lang="ts">
  import App from '$lib/components/App.svelte';
  import BaseLayout from '$lib/components/layout/BaseLayout.svelte';
  import { page } from '$app/stores';

  const routesWithoutNavbar = ['/auth/login'];

  $: noNavbar = routesWithoutNavbar.includes($page.url.pathname);
</script>

<App>
  <BaseLayout {noNavbar}>
    <slot />
  </BaseLayout>
</App>
