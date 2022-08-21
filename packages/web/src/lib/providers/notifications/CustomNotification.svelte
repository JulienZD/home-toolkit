<script lang="ts">
  import { fly } from 'svelte/transition';

  // TODO: Improve prop typing
  export let notification: Record<string, never> = {};

  // `onRemove` function is passed as prop by svelte-notifications
  export let onRemove: null | (() => void) = null;

  const handleButtonClick = () => {
    typeof onRemove === 'function' && onRemove();
  };

  const colorMap = {
    success: 'success',
    danger: 'error',
    warning: 'warning',
    info: 'info',
  };
</script>

<div
  transition:fly={{ x: 100, duration: 150 }}
  class={`flex flex-col items-start min-w-[6rem] justify-start gap-0.5 alert relative mt-1 alert-error !right-1 !bottom-1 alert-${
    colorMap[notification.type] ? colorMap[notification.type] : 'info'
  }`}
>
  <div class="flex justify-between">
    <p class:font-bold={!!notification.body}>{notification.title}</p>
    {#if onRemove}
      <button on:click={handleButtonClick} class="inline-block btn btn-circle btn-ghost btn-sm">X</button>
    {/if}
  </div>
  {#if notification.body}
    <p>{notification.body}</p>
  {/if}
</div>
