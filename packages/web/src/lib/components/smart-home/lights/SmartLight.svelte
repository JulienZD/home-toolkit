<script lang="ts">
  import AppSlider from '$lib/components/ui/form/AppSlider.svelte';
  import Toggle from '$lib/components/ui/form/Toggle.svelte';
  import { smartHome } from '$lib/stores/smart-home/smart-home';
  import type { ISmartLight } from '@home-toolkit/types/smart-home';

  export let light: ISmartLight;

  const toggleLight = () => {
    smartHome.operateLight(light.id, { isOn: !light.isOn });
  };

  const setBrightness = (brightness: number) => {
    smartHome.operateLight(light.id, { brightness });
  };
</script>

<div class="my-6 bg-base-300 rounded p-4">
  <p class="font-bold text-lg mb-2">{light.name}</p>
  <Toggle on:click={toggleLight} bind:checked={light.isOn} label="Enabled" />

  <AppSlider min={0} max={100} value={light.brightness} on:change={(e) => setBrightness(e.detail)} />

  <p class="text-sm mt-2">Brightness: {light.brightness.toFixed()}</p>
</div>
