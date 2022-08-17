<script lang="ts">
  import { Box, Switch, Text } from '@svelteuidev/core';
  import { smartHome } from '$lib/stores/smart-home/smart-home';

  const toggleLight = (lightId: string) => {
    smartHome.toggleLight(lightId);
  };

  $: lightsLoaded = !!Object.keys($smartHome.lights).length;

  // Looping over the store as is done below gives false positives
  /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
</script>

{#if !lightsLoaded}
  <p>Loading light data...</p>
{:else}
  {#each Object.entries($smartHome.lights) as [lightId, light]}
    <Box my="xl">
      <Text weight="bold">{light.name}</Text>
      <Switch on:click={() => toggleLight(lightId)} bind:checked={light.isOn} label="Enabled" />
      <Text mt="sm" size="sm">Brightness: {light.brightness.toFixed()}</Text>
    </Box>
  {/each}
{/if}
