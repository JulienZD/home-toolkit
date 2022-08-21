<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let min: number;
  export let max: number;
  export let value: number;

  const dispatch = createEventDispatcher<{ change: number }>();

  const emitValue = () => {
    dispatch('change', value);
  };

  let focused = false;
  const toggleFocused = () => (focused = !focused);
</script>

<div>
  <input
    class="w-full sm:w-auto range range-sm range-primary"
    class-focused={focused}
    type="range"
    {min}
    {max}
    bind:value
    on:mousedown={toggleFocused}
    on:mouseup={toggleFocused}
    on:change={emitValue}
  />
  {#if focused}
    <span>{value}</span>
  {/if}
</div>
