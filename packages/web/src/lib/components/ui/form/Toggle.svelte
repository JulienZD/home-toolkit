<script lang="ts">
  export let label: string | undefined = undefined;
  export let checked: boolean | undefined = undefined;

  export let size: 'xs' | 'sm' | 'md' | 'lg' | undefined = undefined;

  export let id: string = Math.random().toString(36).slice(2);
  export let labelLeft: boolean = false;
</script>

{#if label}
  <div class="inline-flex items-center gap-2" class:flex-row-reverse={labelLeft}>
    <input {id} type="checkbox" class={`toggle toggle-primary ${size ? 'toggle-' + size : ''}`} bind:checked on:click />
    <label for={id} class="label cursor-pointer">
      <span class="label-text">{label}</span>
    </label>
  </div>
{:else}
  <input type="checkbox" class={`toggle toggle-primary ${size ? 'toggle-' + size : ''}`} bind:checked on:click />
{/if}
