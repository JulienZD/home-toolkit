<script lang="ts">
  import { smartHome } from '$lib/stores/smart-home/smart-home';
  import SmartLight from '$lib/components/smart-home/lights/SmartLight.svelte';

  $: lightsLoaded = !!Object.keys($smartHome?.lights).length;
</script>

{#if !lightsLoaded}
  <p>Loading light data...</p>
{:else}
  {#each Object.values($smartHome?.lights) as light (light.id)}
    <SmartLight {light} />
  {/each}
{/if}
