<script lang="ts">
  import { Anchor, Button, Text, Title } from '@svelteuidev/core';

  let clicked = false;
</script>

<Title>Welcome to SvelteKit</Title>
<Text>Visit <Anchor href="https://kit.svelte.dev">kit.svelte.dev</Anchor> to read the documentation</Text>

<Text>hello</Text>

<Button on:click={() => (clicked = !clicked)}>
  {clicked ? "Don't click me anymore" : 'Click me'}
</Button>
