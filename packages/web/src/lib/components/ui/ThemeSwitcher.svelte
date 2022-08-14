<script>
  import { MoonIcon, SunIcon } from 'svelte-feather-icons';
  import { Button } from '@svelteuidev/core';
  import { isDark } from '$lib/stores/theme';

  const toggleTheme = () => ($isDark = !$isDark);
</script>

<Button
  compact
  type="button"
  override={{ px: '$4 !important', py: '$8 !important' }}
  color="gray"
  variant="outline"
  title={`Change color theme to ${$isDark ? 'light' : 'dark'}`}
  on:click={toggleTheme}
>
  {#if $isDark}
    <SunIcon />
  {:else}
    <MoonIcon />
  {/if}
</Button>
