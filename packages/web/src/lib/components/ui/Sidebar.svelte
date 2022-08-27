<script lang="ts">
  import { page } from '$app/stores';
  import { pages } from '$lib/data/pages';
  import { user } from '$lib/stores/auth';

  export let closeDrawer: () => void;

  export let drawerSidebarScrollY: number;
  $: switchNavbarStyle = drawerSidebarScrollY > 40 ? true : false;

  let visiblePages = pages;
  $: {
    const authFilter = ({ auth }: { auth?: boolean }) => (!!auth ? !!$user : true);
    // Filter out protected pages if the user isn't authenticated
    visiblePages = pages.filter(authFilter).map((page) => ({
      ...page,
      items: page.items.filter(authFilter),
    }));
  }
</script>

<div
  class={`z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ${
    switchNavbarStyle ? 'shadow-sm' : ''
  }`}
>
  <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2">
    <div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
      <span class="normal-case">Home</span>
      <span class="text-base-content lowercase">kit</span>
    </div>
  </a>
</div>

<div class="h-4" />

{#each visiblePages as { name, items }}
  <ul class="menu menu-compact flex flex-col p-0 px-4">
    {#if name && name !== 'excluded'}
      <li />
      <li class="menu-title"><span>{name}</span></li>
    {/if}
    {#if name !== 'excluded'}
      {#each items as { name, href, icon, badge, hidden, highlightAnotherItem }}
        {#if !hidden}
          <li>
            <a
              sveltekit:prefetch
              {href}
              on:click={closeDrawer}
              id={$page.url.pathname.startsWith(href + '/') ? 'active-menu' : ''}
              class={`flex gap-4 ${$page.url.pathname == href ? 'active' : ''} ${
                $page.url.pathname === highlightAnotherItem + '/' ? 'active' : ''
              } ${$page.url.pathname.startsWith(href + '/') ? 'active' : ''}`}
            >
              {#if icon}
                <span class="flex-none">
                  {@html icon}
                </span>
              {/if}
              <span class="flex-1">
                {@html name}
              </span>
              {#if badge}
                <span class="badge badge-sm flex-none lowercase">{badge}</span>
              {/if}
            </a>
          </li>
        {/if}
      {/each}
    {/if}
  </ul>
{/each}
