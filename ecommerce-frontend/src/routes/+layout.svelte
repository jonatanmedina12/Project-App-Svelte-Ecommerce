<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { authStore } from '$lib/stores/auth';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../app.css';

  let previousPath = '/';
  const protectedRoutes = ['/orders','/products'];

  onMount(() => {
    authStore.initialize();
  });

  $: currentPath = $page.url.pathname;

  $: {
    if ($page.url.pathname !== currentPath) {
      previousPath = currentPath;
      currentPath = $page.url.pathname;

      // Verifica si la ruta actual es una ruta protegida
      const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

      // Redirige al usuario a la página de inicio de sesión si no está autenticado y está intentando acceder a una ruta protegida
      if (isProtectedRoute && !$authStore.isAuthenticated) {
        goto(`/login?redirectTo=${currentPath}`);
      }
    }
  }
</script>

<div class="app-container">
  <Header />

  <main class="container mt-4">
    <div class="page-transition-container">
      {#key currentPath}
        <div class="page-content">
          <slot />
        </div>
      {/key}
    </div>
  </main>

  <Footer />
</div>