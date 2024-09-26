<script lang="ts">
  import { page } from '$app/stores';

  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { auth } from '$lib/stores/auth';
  import '../app.css';
  import { redirect } from '@sveltejs/kit';
  let previousPath = '/';

  const protectedRoutes = ['/orders'];

  let currentPath = $page.url.pathname;
  $: {
    if ($page.url.pathname !== currentPath) {
      previousPath = currentPath;
      currentPath = $page.url.pathname;

      // Verifica si la ruta actual es una ruta protegida
      const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

      // Redirige al usuario a la página de inicio de sesión si no está autenticado y está intentando acceder a una ruta protegida
      if (isProtectedRoute && !$auth.isAuthenticated) {
        throw redirect(302, `/login?redirectTo=${currentPath}`);
      }
    }
  }
  $: {
    if ($page.url.pathname !== currentPath) {
      previousPath = currentPath;
      currentPath = $page.url.pathname;
    }
  }
  
</script>

<div class="app-container">
  <Header />

  <main class="container mt-4">
    <div class="page-transition-container">
      {#key currentPath}
        <div
          class="page-content"
        >
          <slot />
        </div>
      {/key}
    </div>
  </main>

  <Footer />
</div>