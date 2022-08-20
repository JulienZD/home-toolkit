<script lang="ts">
  import { Button, Center, Container, Paper, Stack, TextInput, Title } from '@svelteuidev/core';
  import { auth } from '$lib/stores/auth';
  import { createHTTPErrorHandler } from '$lib/util/handleHTTPError';
  import { goto } from '$app/navigation';

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
    errors = {};
    generalError = '';

    try {
      await auth.login(email, password);
    } catch (error) {
      const handleError = createHTTPErrorHandler(({ type, error, responseStatus }) => {
        if (type === 'validation-error') {
          errors = error.response?.data?.fieldErrors ?? {};
        } else if (type === 'http') {
          generalError = responseStatus === 401 ? 'Invalid credentials' : error.message;
        } else {
          generalError = type === 'error' ? error.message : 'An unknown error occurred';
        }
      });

      handleError(error);
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
