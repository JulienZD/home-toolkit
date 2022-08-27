<script lang="ts">
  import { weather } from '$lib/stores/weather';
  import humanizeDuration from 'humanize-duration';
  import { onDestroy, onMount } from 'svelte';
  import DashboardWidget from './DashboardWidget.svelte';

  let accurateAsOf = '';

  const updateTimeInterval = setInterval(() => {
    if (!$weather || 'error' in $weather) return;

    accurateAsOf = humanizeDuration(Date.now() - $weather.retrievalTime * 1000, { round: true, units: ['h', 'm'] });
  }, 1000);

  onMount(() => {
    weather.start();
  });

  onDestroy(() => {
    weather.stop();
    clearInterval(updateTimeInterval);
  });

  const METERS_PER_SEC_TO_KM_PER_HOUR_CONVERSION_UNIT = 3.6;
  const mpsToKmH = (speedInMeters: number) => Math.floor(speedInMeters * METERS_PER_SEC_TO_KM_PER_HOUR_CONVERSION_UNIT);
</script>

<DashboardWidget title="Weather">
  {#await weather.init()}
    <p>Loading...</p>
  {:then}
    {#if $weather && 'error' in $weather}
      <p class="text-error">Error: {$weather.error}</p>
    {:else if $weather}
      <div class="h-full flex flex-col">
        <div class="flex gap-x-2 justify-between grow">
          <div class="flex flex-col">
            <div class="flex gap-x-1">
              <p class="text-3xl font-semibold">{Math.floor($weather.temperature.feelsLike)}</p>
              <span>°C</span>
            </div>
            <p>{$weather.main}</p>
          </div>
          <div class="flex flex-col">
            <p class="text-sm">Humidity: {$weather.humidity}%</p>
            <p class="text-sm">
              Wind: {mpsToKmH($weather.wind.speed)} km/h
            </p>
          </div>
        </div>

        <div class="min-w-[16rem]">
          <span class="text-xs">Data is accurate as of {accurateAsOf} ago</span>
        </div>
      </div>
    {/if}
  {:catch err}
    <p class="text-error">Error: {err}</p>
  {/await}
</DashboardWidget>
