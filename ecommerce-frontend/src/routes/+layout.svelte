<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../app.css';

  let previousPath = '/';
  let currentPath = $page.url.pathname;

  function getTransitionDirection(fromPath: string, toPath: string) {
    const paths = ['/', '/products', '/orders', '/login', '/register'];
    const fromIndex = paths.indexOf(fromPath);
    const toIndex = paths.indexOf(toPath);
    return fromIndex < toIndex ? 1 : -1;
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