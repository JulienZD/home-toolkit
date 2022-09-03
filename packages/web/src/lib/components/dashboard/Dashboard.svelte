<script lang="ts">
  import ClockWidget from './widgets/ClockWidget.svelte';
  import SmartLightsWidget from './widgets/SmartLightsWidget.svelte';
  import WeatherWidget from './widgets/WeatherWidget.svelte';
</script>

<h1 class="mb-2">Dashboard</h1>

<div class="grid gap-2 items-start grid-flow-row md:grid-flow-col justify-start">
  <SmartLightsWidget />
  <WeatherWidget />
  <ClockWidget />
</div>
