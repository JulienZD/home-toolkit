<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let min: number;
  export let max: number;
  export let value: number;

  const dispatch = createEventDispatcher<{ change: number }>();

  const emitValue = () => {
    dispatch('change', value);
  };

  let showValue = false;

  const toggleShowValue = () => (showValue = !showValue);
</script>

<div>
  <input
    class="w-full sm:w-auto"
    type="range"
    {min}
    {max}
    bind:value
    on:mousedown={toggleShowValue}
    on:mouseup={toggleShowValue}
    on:change={emitValue}
  />
  {#if showValue}
    <span>{value}</span>
  {/if}
</div>
