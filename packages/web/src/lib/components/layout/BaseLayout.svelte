<script lang="ts">
  import { AppShell, Header, Navbar, ShellSection, fns } from '@svelteuidev/core';

  import HeaderContent from '$lib/components/layout/HeaderContent.svelte';
  import NavbarContent from '$lib/components/layout/NavbarContent.svelte';
  import { isDark } from '$lib/stores/theme';

  export let noNavbar = false;
  $: showNavbar = !noNavbar;

  let isNavbarOpened = false;
  const toggleNavbar = () => (isNavbarOpened = !isNavbarOpened);

  /*
   * Hack to force the global navbar-width CSS variable to properly reset when navigating
   * to a page without a navbar. Without this, the original width of the navbar remains as empty space.
   */
  $: {
    if (typeof window !== 'undefined') {
      const svelteUINavbarCSSVariable = '--svelteui-navbar-width';
      if (showNavbar) {
        document.documentElement.style.removeProperty(svelteUINavbarCSSVariable);
      } else {
        document.documentElement.style.setProperty(svelteUINavbarCSSVariable, '0px');
      }
    }
  }
</script>

<AppShell
  fixed
  navbarOffsetBreakpoint="sm"
  asideOffsetBreakpoint="sm"
  override={{
    main: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      bc: $isDark ? fns.themeColor('dark', 8) : fns.themeColor('gray', 0),
    },
  }}
>
  {#if showNavbar}
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
  {/if}

  <Header fixed slot="header" height={60} override={{ p: '$mdPX' }}>
    <HeaderContent {noNavbar} {isNavbarOpened} on:toggleNavbar={toggleNavbar} />
  </Header>

  <ShellSection grow override={{ h: '100%' }}>
    <slot />
  </ShellSection>
</AppShell>
