<script lang="ts">
  export let value: string;

  export let error: string = '';
  export let label: string;
  export let name: string = label.toLowerCase();
  export let placeholder: string = '';
  export let type: 'text' | 'email' | 'password' | 'phone' = 'text';

  // Set type via an action, since it can't be dynamic if the input uses two-way binding
  const typeAction = (node: HTMLInputElement) => {
    node.type = type;
  };
</script>

<div class="form-control w-full max-w-md">
  <label for={name} class="label">
    <span class="label-text">{label}</span>
  </label>
  <input
    {name}
    use:typeAction
    {placeholder}
    bind:value
    class="input input-bordered w-full max-w-md"
    class:input-error={!!error}
  />
  {#if error}
    <span class="text-sm text-error">{error}</span>
  {/if}
</div>
