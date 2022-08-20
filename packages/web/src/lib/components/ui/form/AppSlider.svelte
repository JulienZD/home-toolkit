<script lang="ts">
  // Remove when SvelteUI v0.8.0 releases with their own Slider component
  import { createStyles } from '@svelteuidev/core';

  import { createEventDispatcher } from 'svelte';

  export let min: number;
  export let max: number;
  export let value: number;

  const dispatch = createEventDispatcher<{ change: number }>();

  const emitValue = () => {
    dispatch('change', value);
  };

  const useStyles = createStyles((theme) => ({
    root: {},
    slider: {
      '@xs': {
        width: 'initial !important',
      },
      width: '100%',
    },
  }));

  let showValue = false;

  const toggleShowValue = () => (showValue = !showValue);

  $: ({ classes, getStyles } = useStyles());
</script>

<div class={getStyles()}>
  <input
    class={classes.slider}
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
