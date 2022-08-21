<script lang="ts">
  import { auth } from '$lib/stores/auth';

  const logout = () => auth.logout();
</script>

{#if !$auth}
  <a role="button" class="btn btn-link hover:no-underline" href="/auth/login">Login</a>
{:else}
  <button class="btn btn-ghost" on:click={logout}>Logout</button>
{/if}
