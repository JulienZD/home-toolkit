<script lang="ts">
  import { themes } from '$lib/data/themes';
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';
  import { browser } from '$app/env';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  let initialTheme: string;

  onMount(() => {
    themeChange(false);
    if (!browser) return;

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      initialTheme = storedTheme;
    }
  });
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" class="btn gap-1 btn-ghost">
    <span>Theme</span>
    <ChevronDownIcon size="16" />
  </div>

  <div tabindex="0" class="menu dropdown-content bg-base-200 p-2 shadow rounded-box w-52 mt-4 h-52 overflow-y-auto">
    <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
      {#each themes as theme}
        <div
          class="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
          data-set-theme={theme.id}
          data-act-class="outline"
          on:click={() => (initialTheme = theme.id)}
          role="button"
        >
          <div data-theme={theme.id} class="bg-base-100 text-base-content w-full cursor-pointer font-sans">
            <div class="grid grid-cols-5 grid-rows-3">
              <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                <div class="flex-grow text-sm font-bold">
                  {theme.id}
                </div>
                <div class="flex flex-shrink-0 flex-wrap gap-1">
                  <div class="bg-primary w-2 rounded" />
                  <div class="bg-secondary w-2 rounded" />
                  <div class="bg-accent w-2 rounded" />
                  <div class="bg-neutral w-2 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
