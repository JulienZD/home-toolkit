<script lang="ts">
  import { Button, Center, Container, Paper, Stack, TextInput, Title } from '@svelteuidev/core';
  import { goto } from '$app/navigation';
  let email: string;
  let password: string;

  const handleLogin = async () => {
    console.log({ email, password });
    await goto('/');
  };
</script>

<Container
  fluid
  override={{
    '@sm': {
      px: 0,
    },
    h: '100%',
  }}
>
  <Center
    override={{
      h: '100%',
    }}
  >
    <Paper
      override={{
        w: '100%',
        '@md': {
          w: '40%',
        },
        '@xs': {
          w: '66%',
        },
      }}
    >
      <Title align="center">Login</Title>
      <form on:submit|preventDefault={handleLogin}>
        <Stack spacing="lg">
          <TextInput label="Email" type="email" bind:value={email} />
          <TextInput label="Password" type="password" bind:value={password} />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Paper>
  </Center>
</Container>
