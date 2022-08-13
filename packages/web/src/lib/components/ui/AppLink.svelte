<script lang="ts">
  import { Anchor } from '@svelteuidev/core';

  export let href: string;
</script>

<Anchor underline={false} {href}><slot /></Anchor>

