<script lang="ts">
  export let title = '';
</script>

<div class="rounded bg-base-200 p-2">
  {#if title}
    <h2 class="mb-2">{title}</h2>
  {/if}
  <slot />
</div>
