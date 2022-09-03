<script lang="ts">
  import Slider from '$lib/components/ui/form/Slider.svelte';
  import Toggle from '$lib/components/ui/form/Toggle.svelte';
  import { smartHome } from '$lib/stores/smart-home/smart-home';
  import { showNotification } from '$lib/util/notifications';
  import type { ISmartLight, ISmartLightOperation } from '@home-toolkit/types/smart-home';

  export let light: ISmartLight;

  const _operateLight = async (operation: ISmartLightOperation) => {
    try {
      await smartHome.operateLight(light.id, operation);
    } catch (error) {
      showNotification({
        title: 'An error occurred',
        body: error instanceof Error ? error.message : String(error),
        type: 'danger',
      });
    }
  };

  const toggleLight = () => _operateLight({ isOn: !light.isOn });
  const setBrightness = (brightness: number) => _operateLight({ brightness });
</script>

<div class="bg-base-300 rounded p-4">
  <p class="font-bold text-lg mb-2">{light.name}</p>
  <Toggle on:click={toggleLight} bind:checked={light.isOn} label="Enabled" />

  <Slider min={0} max={100} value={light.brightness} on:change={(e) => setBrightness(e.detail)} />

  <p class="text-sm mt-2">Brightness: {light.brightness.toFixed()}</p>
</div>
