<script lang="ts">
  import { login } from '$lib/services/api';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  
  import 'bootstrap/dist/css/bootstrap.min.css';

  let username = '';
  let password = '';
  let error = '';
  let loading = false;

  onMount(() => {
    authStore.initialize();
    if ($authStore.isAuthenticated) {
      goto('/orders');
    }
  });

  async function handleSubmit() {
    loading = true;
    error = '';
    try {
      const response = await login(username, password);
      authStore.login(response.token, { username }); // Asume que el backend devuelve un objeto con un token
      goto('/orders');  // Redirige siempre a la página de órdenes después del login
    } catch (err) {
      error = 'Login failed. Please check your credentials.';
    } finally {
      loading = false;
    }
  }
</script>
  
  <svelte:head>
    <title>Login | Your E-commerce Store</title>
    <link rel="stylesheet" href="/css/Login.css">
  </svelte:head>
  
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Welcome Back</h2>
            <p class="text-center mb-4">Please login to your account</p>
            <form on:submit|preventDefault={handleSubmit}>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" bind:value={username} required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" bind:value={password} required>
              </div>
              <button type="submit" class="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            {#if error}
              <div class="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            {/if}
            <div class="mt-3 text-center">
              <a href="/forgotPassword" class="text-decoration-none me-3">Forgot Password?</a>
              <a href="/register" class="text-decoration-none">Create an Account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>