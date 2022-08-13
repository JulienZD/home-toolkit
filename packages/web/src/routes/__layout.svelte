<script lang="ts">
  import NavbarContent from '$lib/components/layout/NavbarContent.svelte';
  import HeaderContent from '$lib/components/layout/HeaderContent.svelte';


  import {
  AppShell,fns,Header,
  SvelteUIProvider,
  Navbar,
  ShellSection,
  } from '@svelteuidev/core';

  let isDark = false;
  let isNavbarOpened = false;
  const toggleNavbar = () => (isNavbarOpened = !isNavbarOpened);
  const toggleTheme = () => (isDark = !isDark);
</script>

<SvelteUIProvider ssr withNormalizeCSS withGlobalStyles themeObserver={isDark ? 'dark' : 'light'}>
  <AppShell
    fixed
    navbarOffsetBreakpoint="sm"
    asideOffsetBreakpoint="sm"
    override={{
      main: { bc: isDark ? fns.themeColor('dark', 8) : fns.themeColor('gray', 0) },
    }}
  >
    <Navbar
      slot="navbar"
      hidden={!isNavbarOpened}
      fixed
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 250 }}
      override={{ p: '$mdPX' }}
    >
      <NavbarContent />
    </Navbar>
    <Header fixed slot="header" height={60} override={{ p: '$mdPX' }}>
      <HeaderContent {isNavbarOpened} on:toggleNavbar={toggleNavbar} on:toggleTheme={toggleTheme} />
    </Header>

    <ShellSection grow>
      <slot />
    </ShellSection>
  </AppShell>
</SvelteUIProvider>
