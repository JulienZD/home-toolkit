<script lang="ts">
  import { Burger, Group, Switch } from '@svelteuidev/core'
  import { createEventDispatcher } from 'svelte';

  export let isNavbarOpened: boolean;

  const dispatch = createEventDispatcher();
</script>

<Group position="apart" override={{
  '@sm': {
    justifyContent: 'flex-end !important',
  }
}}>
  <Burger override={{
    '@sm': {
      visibility: 'hidden'
    }
  }} opened={isNavbarOpened} on:click!stopPropagation={() => dispatch('toggleNavbar')} />
  <Switch label="Switch Theme" on:change={() => dispatch('toggleTheme')} />
</Group>
