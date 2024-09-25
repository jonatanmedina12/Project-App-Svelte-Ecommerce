<script lang="ts">
    import { onMount } from 'svelte';
    import { getProducts } from '$lib/services/api';
    import ProductCard from './ProductCard.svelte';
  
    // Define the Product interface (ensure this matches the one in ProductCard.svelte)
    interface Product {
      id: string;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    }
  
    let products: Product[] = [];
    let loading = true;
    let error: string | null = null;
  
    onMount(async () => {
      try {
        products = await getProducts();
      } catch (e) {
        // Type guard to ensure e is an Error object
        if (e instanceof Error) {
          error = e.message;
        } else {
          error = 'An unknown error occurred';
        }
      } finally {
        loading = false;
      }
    });
  </script>
  
  {#if loading}
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  {:else if error}
    <div class="alert alert-danger" role="alert">
      {error}
    </div>
  {:else}
    <div class="row row-cols-1 row-cols-md-3 g-4">
      {#each products as product (product.id)}
        <div class="col">
          <ProductCard {product} />
        </div>
      {/each}
    </div>
  {/if}