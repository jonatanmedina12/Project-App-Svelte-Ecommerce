<script>
  import { onMount } from 'svelte';
  import { getProducts } from '$lib/services/api';
  import { fade, slide } from 'svelte/transition';

  /**
   * @type {string | any[]}
   */
  let products = [];
  let loading = true;

  onMount(async () => {
      try {
          products = await getProducts();
      } catch (error) {
          console.error('Error fetching products:', error);
      } finally {
          loading = false;
      }
  });
</script>

<svelte:head>
  <title>Products</title>
</svelte:head>

<div class="products-container">
  <h1 class="slide-in">Our Products</h1>
  
  {#if loading}
      <p>Loading products...</p>
  {:else if products.length === 0}
      <p>No products found.</p>
  {:else}
      <div class="products-grid">
          {#each products as product (product.id)}
              <div class="product-card" transition:fade>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p class="price">${product.price}</p>
                  <button class="btn">Add to Cart</button>
              </div>
          {/each}
      </div>
  {/if}
</div>

<style>
  .products-container {
      max-width: 1200px;
      margin: 0 auto;
  }

  .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
  }

  .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .price {
      font-weight: bold;
      color: var(--primary-color);
  }
</style>