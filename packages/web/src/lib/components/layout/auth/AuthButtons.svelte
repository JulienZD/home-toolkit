<script lang="ts">
  import { Button, Group } from '@svelteuidev/core';
  import AppLink from '$lib/components/ui/AppLink.svelte';
  import { auth } from '$lib/stores/auth';

  const logout = () => auth.logout();
</script>

<Group>
  {#if !$auth}
    <AppLink href="/auth/login">Login</AppLink>
  {:else}
    <Button on:click={logout} variant="light">Logout</Button>
  {/if}
</Group>
