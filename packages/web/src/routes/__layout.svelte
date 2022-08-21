<script lang="ts">
  // Layout adapted from daisyUI's docs
  import '../app.css';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import Navbar from '$lib/components/ui/Navbar.svelte';
  import Sidebar from '$lib/components/ui/Sidebar.svelte';
  import { PUBLIC_APP_NAME } from '$env/static/public';
  import { titleCase } from '$lib/util/helpers/titleCase';
  import { queryClient } from '$lib/api/client';
  import NotificationProvider from '$lib/providers/notifications/NotificationProvider.svelte';
  import { QueryClientProvider } from '@sveltestack/svelte-query';
  import { pagesWithoutSidebar } from '$lib/data';

  let drawerContentRef: HTMLDivElement;
  let drawerContentScrollY = 0;

  let drawerSidebarRef: HTMLDivElement;
  let drawerSidebarScrollY = 0;

  const parseContentScroll = () => {
    drawerContentScrollY = drawerContentRef.scrollTop;
  };

  const parseSidebarScroll = () => {
    drawerSidebarScrollY = drawerSidebarRef.scrollTop;
  };

  onMount(() => {
    parseContentScroll();
    parseSidebarScroll();
  });

  afterNavigate(() => {
    drawerContentRef.scrollTop = 0;
  });

  let isDrawerOpen: boolean = false;

  function closeDrawer() {
    isDrawerOpen = false;
  }

  $: determineTitle = () => {
    const path = $page.url.pathname;

    if (path === '/') return PUBLIC_APP_NAME;

    const parts = path.split('/').slice(1);

    return `${PUBLIC_APP_NAME} | ${titleCase(parts.join(' '))}`;
  };

  $: title = determineTitle();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <NotificationProvider>
    <div class={`bg-base-100 drawer ${pagesWithoutSidebar.includes($page.url.pathname) ? '' : 'drawer-mobile'}`}>
      <input id="drawer" type="checkbox" class="drawer-toggle" bind:checked={isDrawerOpen} />
      <div
        bind:this={drawerContentRef}
        on:scroll={parseContentScroll}
        class={`drawer-content`}
        style="scroll-behavior: smooth; scroll-padding-top: 5rem;"
      >
        <Navbar {drawerContentScrollY} />
        <main class={`${pagesWithoutSidebar.includes($page.url.pathname) ? '' : 'p-6 pb-16'}`}>
          <slot />
        </main>
      </div>
      <div
        class="drawer-side"
        style="scroll-behavior: smooth; scroll-padding-top: 5rem;"
        bind:this={drawerSidebarRef}
        on:scroll={parseSidebarScroll}
      >
        <label for="drawer" class="drawer-overlay" />
        <aside class="bg-base-200 w-80">
          <Sidebar {closeDrawer} {drawerSidebarScrollY} />
          <div class="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
        </aside>
      </div>
    </div>
  </NotificationProvider>
</QueryClientProvider>
