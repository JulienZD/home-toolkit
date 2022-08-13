<script lang="ts">
  import { Burger, Group, Switch } from '@svelteuidev/core';
  import AuthButtons from './auth/AuthButtons.svelte';
  import { createEventDispatcher } from 'svelte';
  import { isDark } from '$lib/stores/theme';
  import { user } from '$lib/stores/auth';

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
  {#if $user}
    <span>Hello {$user.username}</span>
  {/if}
  <AuthButtons />
</Group>
