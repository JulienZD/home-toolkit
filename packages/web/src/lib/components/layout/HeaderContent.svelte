<script lang="ts">
  import { Burger, Group, Switch, colorScheme } from '@svelteuidev/core';
  import AppLink from '../ui/AppLink.svelte';
  import { createEventDispatcher } from 'svelte';
  import { isDark } from '$lib/stores/theme';

  export let isNavbarOpened: boolean;
  export let noNavbar: boolean;

  const dispatch = createEventDispatcher();
</script>

<Group
  position={noNavbar ? 'right' : 'apart'}
  override={{
    '@sm': {
      justifyContent: 'flex-end !important',
    },
    alignItems: 'center',
  }}
>
  {#if !noNavbar}
    <Burger
      override={{
        '@sm': {
          visibility: 'hidden',
        },
      }}
      opened={isNavbarOpened}
      on:click!stopPropagation={() => dispatch('toggleNavbar')}
    />
  {/if}
  <Switch bind:checked={$isDark} label="Switch Theme" />
  <AppLink href="/auth/login">Login</AppLink>
</Group>
