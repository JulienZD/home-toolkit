<script lang="ts">
  import App from '$lib/components/App.svelte';
  import BaseLayout from '$lib/components/layout/BaseLayout.svelte';
  import { PUBLIC_APP_NAME } from '$env/static/public';
  import { page } from '$app/stores';
  import { titleCase } from '$lib/util/helpers/titleCase';

  const routesWithoutNavbar = ['/auth/login'];

  $: determineTitle = () => {
    const path = $page.url.pathname;

    if (path === '/') return PUBLIC_APP_NAME;

    const parts = path.split('/').slice(1);

    return `${PUBLIC_APP_NAME} | ${titleCase(parts.join(' '))}`;
  };

  $: noNavbar = routesWithoutNavbar.includes($page.url.pathname);

  $: title = determineTitle();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<App>
  <BaseLayout {noNavbar}>
    <slot />
  </BaseLayout>
</App>
