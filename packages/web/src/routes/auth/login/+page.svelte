<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { createHTTPErrorHandler } from '$lib/util/handleHTTPError';
  import { goto } from '$app/navigation';
  import TextInput from '$lib/components/ui/form/TextInput.svelte';

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
          errors = error.data.fieldErrors ?? {};
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

<div class="h-full flex items-center justify-center">
  <div class="w-full sm:w-2/3 md:w-2/5 p-4 rounded bg-base-200  max-w-md">
    <h1 class="text-center text-4xl">Login</h1>
    <form on:submit|preventDefault={handleLogin}>
      <div class="flex flex-col gap-5">
        {#if generalError}
          <p>{generalError}</p>
        {/if}
        <TextInput label="Email" type="email" bind:value={email} error={errors?.['email']?.[0]} />
        <TextInput label="Password" type="password" bind:value={password} error={errors?.['password']?.[0]} />
        <button class="btn btn-primary" type="submit">Login</button>
      </div>
    </form>
  </div>
</div>
