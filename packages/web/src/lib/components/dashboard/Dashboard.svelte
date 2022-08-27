<script lang="ts">
  import SmartLightsWidget from './widgets/SmartLightsWidget.svelte';
  import WeatherWidget from './widgets/WeatherWidget.svelte';
</script>

<h1>Dashboard</h1>

<div class="grid gap-2 grid-flow-row md:grid-flow-col">
  <SmartLightsWidget />
  <WeatherWidget />
</div>
