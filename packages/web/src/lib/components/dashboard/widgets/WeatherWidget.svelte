<script lang="ts">
  import { api } from '$lib/api/http';
  import { getGeolocation } from '$lib/util/helpers/geolocation';
  import type { IWeatherForecast } from '@home-toolkit/types/weather';
  import { onMount } from 'svelte';
  import DashboardWidget from './DashboardWidget.svelte';

  let weatherData: IWeatherForecast;
  let error = '';

  onMount(async () => {
    try {
      const position = await getGeolocation();

      const { latitude, longitude } = position.coords;

      weatherData = await api.get<IWeatherForecast>(`weather?lat=${latitude}&lon=${longitude}`);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Something went wrong.';
    }
  });

  const METERS_PER_SEC_TO_KM_PER_HOUR_CONVERSION_UNIT = 3.6;
</script>

<DashboardWidget title="Weather">
  {#if !error && !weatherData}
    <p>Loading...</p>
  {:else if error}
    <p class="text-error">Error: {error}</p>
  {:else}
    <div class="flex gap-x-2 justify-between">
      <div class="flex flex-col">
        <div class="flex gap-x-1">
          <p class="text-3xl font-semibold">{weatherData.temperature.feelsLike.toFixed()}</p>
          <span>°C</span>
        </div>
        <p>{weatherData.main}</p>
      </div>
      <div class="flex flex-col">
        <p class="text-sm">Humidity: {weatherData.humidity}%</p>
        <p class="text-sm">
          Wind: {(weatherData.wind.speed * METERS_PER_SEC_TO_KM_PER_HOUR_CONVERSION_UNIT).toFixed()} km/h
        </p>
      </div>
    </div>
  {/if}
</DashboardWidget>
