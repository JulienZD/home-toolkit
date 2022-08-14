<script lang="ts">
  import { Burger, Group, Text } from '@svelteuidev/core';
  import AppLink from '../ui/AppLink.svelte';
  import AuthButtons from './auth/AuthButtons.svelte';
  import { PUBLIC_APP_NAME } from '$env/static/public';
  import ThemeSwitcher from '../ui/ThemeSwitcher.svelte';
  import { createEventDispatcher } from 'svelte';

  export let isNavbarOpened: boolean;
  export let noNavbar: boolean;

  const dispatch = createEventDispatcher();
</script>

<Group
  position="apart"
  override={{
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
  <AppLink href="/">
    <Text size="xl" variant="gradient" gradient={{ from: 'yellow', to: 'red', deg: 140 }}>{PUBLIC_APP_NAME}</Text>
  </AppLink>
  <Group>
    <ThemeSwitcher />
    <AuthButtons />
  </Group>
</Group>
