<script>
    import { page } from '$app/stores';
  </script>
  
  <header>
    <nav>
      <a href="/" class:active={$page.url.pathname === '/'}>Inicio</a>
      <a href="/products" class:active={$page.url.pathname.startsWith('/products')}>Productos</a>
      <a href="/login" class:active={$page.url.pathname === '/login'}>Iniciar sesión</a>
    </nav>
  </header>
  
  <style>
    header {
      background-color: #333;
      padding: 1rem;
    }
  
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