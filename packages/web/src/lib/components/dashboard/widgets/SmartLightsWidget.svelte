<script lang="ts">
  import SmartLight from '$lib/components/smart-home/lights/SmartLight.svelte';
  import { smartHome } from '$lib/stores/smart-home/smart-home';
  import DashboardWidget from './DashboardWidget.svelte';
</script>

<DashboardWidget title="Smart Lights">
  <div class="grid grid-cols-2 gap-2">
    {#each Object.values($smartHome?.lights) as light (light.id)}
      <SmartLight {light} />
    {/each}
  </div>
</DashboardWidget>
