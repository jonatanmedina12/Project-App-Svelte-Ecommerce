<script lang="ts">
  import { onMount } from 'svelte';
  import { getProducts, createProduct, updateProduct, deleteProduct } from '$lib/services/api';
  import { fade, slide } from 'svelte/transition';
  
  interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
  }

  let products: Product[] = [];
  let loading = true;
  let error = '';
  let showForm = false;
  let newProduct: Omit<Product, 'id'> = { name: '', description: '', price: 0, stockQuantity: 0 };
  let editingProduct: Product | null = null;

  onMount(async () => {
    await loadProducts();
  });

  async function loadProducts() {
    try {
      loading = true;
      products = await getProducts();
    } catch (err) {
      error = 'Error fetching products: ' + (err instanceof Error ? err.message : String(err));
    } finally {
      loading = false;
    }
  }

  async function handleSubmit() {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, newProduct);
      } else {
        await createProduct(newProduct);
      }
      await loadProducts();
      resetForm();
    } catch (err) {
      error = 'Error saving product: ' + (err instanceof Error ? err.message : String(err));
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (err) {
        error = 'Error deleting product: ' + (err instanceof Error ? err.message : String(err));
      }
    }
  }

  function startEdit(product: Product) {
    editingProduct = product;
    newProduct = { ...product };
    showForm = true;
  }

  function resetForm() {
    showForm = false;
    newProduct = { name: '', description: '', price: 0, stockQuantity: 0 };
    editingProduct = null;
    error = '';
  }

  function toggleForm() {
    showForm = !showForm;
    if (showForm) {
      editingProduct = null;
      newProduct = { name: '', description: '', price: 0, stockQuantity: 0 };
    } else {
      resetForm();
    }
  }
</script>

<svelte:head>
  <title>Products</title>
</svelte:head>

<div class="products-container">
  <h1 class="slide-in">Our Products</h1>
  
  {#if error}
    <p class="error" transition:slide>{error}</p>
  {/if}

  <button class="btn btn-primary mb-3" on:click={toggleForm}>
    {showForm ? 'Hide Form' : 'Add New Product'}
  </button>

  {#if showForm}
    <form on:submit|preventDefault={handleSubmit} transition:slide>
      <div class="mb-3">
        <label for="productName">Producto</label>
        <input id="productName" bind:value={newProduct.name} placeholder="Product Name" required class="form-control">
      </div>
      <div class="mb-3">
        <label for="productDescription">Descripción</label>
        <textarea id="productDescription" bind:value={newProduct.description} placeholder="Description" required class="form-control"></textarea>
      </div>
      <div class="mb-3">
        <label for="productPrice">Precio</label>
        <input id="productPrice" type="number" bind:value={newProduct.price} placeholder="Price" required class="form-control" min="0" step="0.01">
      </div>
      <div class="mb-3">
        <label for="productStock">Cantidad existente</label>
        <input id="productStock" type="number" bind:value={newProduct.stockQuantity} placeholder="Stock Quantity" required class="form-control" min="0" step="1">
      </div>
      <button type="submit" class="btn btn-success">{editingProduct ? 'Update' : 'Create'} Product</button>
    </form>
  {/if}
  
  {#if loading}
    <p>Loading products...</p>
  {:else if products.length === 0}
    <p>No products found.</p>
  {:else}
    <div class="products-list">
      {#each products as product (product.id)}
        <div class="product-card" transition:fade>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p class="price"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.stockQuantity}</p>
          <div class="button-group">
            <button class="btn btn-secondary me-2" on:click={() => startEdit(product)}>Edit</button>
            <button class="btn btn-danger" on:click={() => handleDelete(product.id)}>Delete</button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .products-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .products-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #f8f9fa;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .price {
    font-weight: bold;
    color: #28a745;
  }

  .error {
    color: #dc3545;
    font-weight: bold;
    padding: 10px;
    background-color: #f8d7da;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  form {
    background-color: #e9ecef;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  h1 {
    margin-bottom: 20px;
  }

  .slide-in {
    animation: slideIn 0.5s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>