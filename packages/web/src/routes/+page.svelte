<script lang="ts">
  import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
  import { user } from '$lib/stores/auth';
</script>

{#if $user}
  <Dashboard />
{:else}
  <h1>Home</h1>
{/if}
