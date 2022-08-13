<script lang="ts">
  import { Button, Center, Container, Paper, Stack, TextInput, Title } from '@svelteuidev/core';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { isApiBadRequestResponse } from '$lib/util/isApiError';
  import { isAxiosApiError } from '$lib/util/type-guards/api/isAxiosApiError';

  let email: string;
  let password: string;

  let errors: Record<string, string[]> = {};
  let generalError = '';

  auth.subscribe((authenticated) => {
    if (authenticated) {
      void goto('/');
    }
  });

  const handleLogin = async () => {
    try {
      await auth.login(email, password);
    } catch (error) {
      if (isApiBadRequestResponse(error)) {
        errors = error.fieldErrors;
      } else if (isAxiosApiError(error)) {
        generalError = error.message;
      }
    }
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
          {#if generalError}
            <p>{generalError}</p>
          {/if}
          <TextInput label="Email" type="email" bind:value={email} error={errors?.['email']?.[0]} />
          <TextInput label="Password" type="password" bind:value={password} error={errors?.['password']?.[0]} />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Paper>
  </Center>
</Container>
