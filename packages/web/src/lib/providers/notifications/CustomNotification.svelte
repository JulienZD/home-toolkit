<script lang="ts">
  import { Notification } from '@svelteuidev/core';
  import { fly } from 'svelte/transition';

  // TODO: Improve prop typing
  export let notification: Record<string, never> = {};

  // `onRemove` function is passed as prop by svelte-notifications
  export let onRemove: null | (() => void) = null;

  const handleButtonClick = () => {
    typeof onRemove === 'function' && onRemove();
  };

  const colorMap = {
    success: 'green',
    danger: 'red',
    warning: 'orange',
  };
</script>

<div transition:fly={{ x: 100, duration: 150 }}>
  <Notification
    override={{ right: '$4 !important', bottom: '$4 !important' }}
    radius="md"
    title={notification.title}
    color={colorMap[notification.type]}
    on:close={handleButtonClick}
  >
    {#if notification.body}
      {notification.body}
    {/if}
  </Notification>
</div>
