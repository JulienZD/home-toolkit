<script lang="ts">
  import { Paper, Switch, Text } from '@svelteuidev/core';
  import type { ISmartLight } from '@home-toolkit/types/smart-home';
  import { smartHome } from '$lib/stores/smart-home/smart-home';

  export let light: ISmartLight;

  const toggleLight = (lightId: string) => {
    smartHome.toggleLight(lightId);
  };
</script>

<Paper my="xl">
  <Text weight="bold" size="lg" mb="sm">{light.name}</Text>
  <Switch on:click={() => toggleLight(light.id)} bind:checked={light.isOn} label="Enabled" />

  <Text mt="sm" size="sm">Brightness: {light.brightness.toFixed()}</Text>
</Paper>
