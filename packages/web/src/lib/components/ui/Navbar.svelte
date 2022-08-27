<style lang="postcss">
  :global(main) {
    /* Keep in sync with header height below */
    height: calc(100% - theme('height.16'));
  }

  header {
    @apply h-16;
  }
</style>

<script lang="ts">
  import { page } from '$app/stores';
  import AuthButtons from '../layout/auth/AuthButtons.svelte';
  import { pagesWithoutSidebar } from '$lib/data/pages';
  import ThemeSwitcher from './ThemeSwitcher.svelte';

  $: noNavbar = pagesWithoutSidebar.includes($page.url.pathname);

  export let drawerContentScrollY: number;
  $: switchNavbarStyle = drawerContentScrollY > 40 ? true : false;
</script>

<header
  class={`
  sticky top-0 z-30 flex w-full justify-center backdrop-blur transition-all duration-100 
  ${
    $page.url.pathname == '/'
      ? switchNavbarStyle
        ? 'bg-base-100 text-base-content shadow-sm'
        : 'text-primary-content'
      : switchNavbarStyle
      ? 'bg-base-100 text-base-content shadow-sm'
      : 'bg-base-100 text-base-content'
  }
  `}
>
  <nav class="navbar w-full">
    <div class="flex flex-1 md:gap-1 lg:gap-2">
      {#if !noNavbar}
        <span class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="Menu">
          <label for="drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
              ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg
            >
          </label>
        </span>
      {/if}
      <div class="flex items-center gap-2">
        <a
          href="/"
          aria-current="page"
          aria-label="Homepage"
          class={`flex-0 btn btn-ghost px-2 ${noNavbar ? '' : 'lg:hidden'}`}
        >
          <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
            <span class="capitalize">home</span>
            <span class="lowercase text-base-content">kit</span>
          </div>
        </a>
      </div>
    </div>
    <div class="flex-0">
      <ThemeSwitcher />
      <AuthButtons />
    </div>
  </nav>
</header>
