<script lang="ts">
  import { themes } from '$lib/data/themes';
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';

  onMount(() => {
    themeChange(false);
  });
</script>

<div class="dropdown dropdown-end">
  <span tabindex="0" class="btn btn-ghost rounded-btn">Theme</span>
  <ul tabindex="0" class="menu dropdown-content bg-base-200 p-2 shadow rounded-box w-52 mt-4 h-52 overflow-y-auto">
    {#each themes as theme}
      <li>
        <button class="btn btn-sm btn-ghost" data-set-theme={theme.id}>{theme.name}</button>
      </li>
    {/each}
  </ul>
</div>
