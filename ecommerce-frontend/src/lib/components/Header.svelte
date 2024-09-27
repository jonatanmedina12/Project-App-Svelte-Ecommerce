<script lang="ts">
    import { page } from '$app/stores';
    import { logout } from '$lib/services/api';
    import { authStore } from '$lib/stores/auth';
    import { goto } from '$app/navigation';



  async function handleLogout() {
    await logout();
    authStore.logout();
    goto('/');

  }


  </script>
  
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="/">E-commerce Platform</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === '/'} href="/">Home</a>
            </li>
            {#if $authStore.isAuthenticated}

            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === '/products'} href="/products">Products</a>
            </li>
            {/if}
            {#if $authStore.isAuthenticated}
              <li class="nav-item">
                <a class="nav-link" class:active={$page.url.pathname === '/orders'} href="/orders">Orders</a>
              </li>
            {/if}
          </ul>
          <ul class="navbar-nav">
            {#if $authStore.isAuthenticated}
              <li class="nav-item">
                <span class="nav-link">Welcome, {$authStore.user?.username ?? "Sin datos"}</span>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/" on:click|preventDefault={handleLogout}>Logout</a>
              </li>
            {:else}
              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
              </li>
            {/if}
          </ul>
        </div>
      </div>
    </nav>
  </header>
  
  <style>
  

    nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  
    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
  
    a:hover, a.active {
      background-color: #555;
    }
  </style>