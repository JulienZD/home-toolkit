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

  <ul tabindex="0" class="menu dropdown-content bg-base-200 p-2 shadow rounded-box w-52 mt-4 h-52 overflow-y-auto">
    {#each themes as theme}
      <li>
        <button
          class="btn btn-sm btn-ghost"
          class:active={initialTheme === theme.id}
          data-set-theme={theme.id}
          on:click={() => (initialTheme = theme.id)}>{theme.name}</button
        >
      </li>
    {/each}
  </ul>
</div>
