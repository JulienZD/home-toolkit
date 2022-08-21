<script lang="ts">
  import { Paper, Switch, Text } from '@svelteuidev/core';
  import type { ISmartLight } from '@home-toolkit/types/smart-home';
  import { smartHome } from '$lib/stores/smart-home/smart-home';
  import AppSlider from '$lib/components/ui/form/AppSlider.svelte';

  export let light: ISmartLight;

  const toggleLight = () => {
    smartHome.operateLight(light.id, { isOn: !light.isOn });
  };

  const setBrightness = (brightness: number) => {
    smartHome.operateLight(light.id, { brightness });
  };
</script>

<Paper my="xl">
  <Text weight="bold" size="lg" mb="sm">{light.name}</Text>
  <Switch on:click={toggleLight} bind:checked={light.isOn} label="Enabled" />

  <AppSlider min={0} max={100} value={light.brightness} on:change={(e) => setBrightness(e.detail)} />

  <Text mt="sm" size="sm">Brightness: {light.brightness.toFixed()}</Text>
</Paper>
