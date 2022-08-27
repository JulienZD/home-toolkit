<script lang="ts">
  import { goto } from '$app/navigation';

  import { auth } from '$lib/stores/auth';

  const logout = () => {
    goto('/').then(() => auth.logout());
  };
</script>

{#if !$auth}
  <a role="button" class="btn btn-link hover:no-underline" href="/auth/login">Login</a>
{:else}
  <button class="btn btn-ghost" on:click={logout}>Logout</button>
{/if}
