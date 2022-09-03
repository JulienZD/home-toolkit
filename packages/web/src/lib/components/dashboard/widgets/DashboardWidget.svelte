<script lang="ts">
  export let title = '';

  export let px = '2';
  export let py = '2';
</script>

<div class={`rounded bg-base-200 px-${px} py-${py} flex flex-col`}>
  {#if title}
    <h2 class="mb-2">{title}</h2>
  {/if}
  <slot />
</div>
