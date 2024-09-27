<script lang="ts">
  import { onMount } from 'svelte';
  import { getOrders, createOrder, updateOrder, deleteOrder, getProducts } from '$lib/services/api';
  import { fade, slide } from 'svelte/transition';

  interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
  }

  interface Order {
    id: number;
    customerEmail: string;
    totalAmount: number;
    items: OrderItem[];
  }

  interface Product {
    id: number;
    name: string;
    price: number;
  }

  let orders: Order[] = [];
  let products: Product[] = [];

  let loading = true;
  let error = '';
  let showForm = false;
  let newOrder: Omit<Order, 'id'> = { customerEmail: '', totalAmount: 0, items: [] };
  let editingOrder: Order | null = null;

  $: totalAmount = newOrder.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  onMount(async () => {
    await loadOrders();
    await loadProducts();
  });

  async function loadOrders() {
    try {
      loading = true;
      orders = await getOrders();
    } catch (err) {
      error = `Error fetching orders: ${err instanceof Error ? err.message : String(err)}`;
    } finally {
      loading = false;
    }
  }

  async function loadProducts() {
    try {
      products = await getProducts();
    } catch (err) {
      error = `Error fetching products: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  async function handleSubmit() {
    try {
      if (!validateOrder()) return;

      if (editingOrder) {
        await updateOrder(editingOrder.id, newOrder);
      } else {
        await createOrder(newOrder);
      }
      await loadOrders();
      resetForm();
    } catch (err) {
      error = `Error saving order: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  async function handleDelete(id: number, customerEmail: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id, customerEmail);
        await loadOrders();
      } catch (err) {
        error = `Error deleting order: ${err instanceof Error ? err.message : String(err)}`;
      }
    }
  }

  function startEdit(order: Order) {
    editingOrder = order;
    newOrder = { ...order };
    showForm = true;
  }

  function cancelEdit() {
    editingOrder = null;
    resetForm();
  }

  function addItem() {
    newOrder.items = [...newOrder.items, { productId: 0, quantity: 1, price: 0 }];
  }

  function removeItem(index: number) {
    newOrder.items = newOrder.items.filter((_, i) => i !== index);
    
  }

  function validateOrder(): boolean {
    if (!newOrder.customerEmail || newOrder.items.length === 0) {
      error = 'Please fill all required fields and add at least one item.';
      return false;
    }
    return true;
  }

  function resetForm() {
    showForm = false;
    newOrder = { customerEmail: '', totalAmount: 0, items: [] };
    editingOrder = null;
    error = '';
  }

  function updateItemPrice(index: number, productId: number) {
    const product = products.find(p => p.id === productId);
    if (product) {
      newOrder.items[index].price = product.price;
      newOrder = { ...newOrder }; // Trigger reactivity
    }
  }
</script>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<div class="orders-container">
  <h1 class="slide-in">Orders</h1>
  
  {#if error}
    <p class="error" transition:slide>{error}</p>
  {/if}

  <button class="btn btn-primary mb-3" on:click={() => showForm = !showForm}>
    {showForm ? 'Hide Form' : 'Create New Order'}
  </button>

  {#if showForm}
    <form on:submit|preventDefault={handleSubmit} transition:slide>
      <div class="mb-3">
        <label for="customerEmail" class="form-label">Customer Email</label>
        <input id="customerEmail" bind:value={newOrder.customerEmail} type="email" class="form-control" required>
      </div>
      
      <h3>Order Items</h3>
      {#each newOrder.items as item, index}
        <div class="row mb-2">
          <div class="col">
            <select 
                bind:value={item.productId} 
                class="form-select" 
                required
                on:change={() => updateItemPrice(index, item.productId)}
              >
                <option value="">Select a product</option>
                {#each products as product}
                  <option value={product.id}>{product.id} - {product.name}</option>
                {/each}
            </select>
          </div>
          <div class="col">
            <input bind:value={item.quantity} type="number" class="form-control" placeholder="Quantity" required min="1">
          </div>
          <div class="col">
            <input value={item.price.toFixed(2)} type="text" class="form-control" placeholder="Price" readonly>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-danger" on:click={() => removeItem(index)}>Remove</button>
          </div>
        </div>
      {/each}
      
      <button type="button" class="btn btn-secondary mb-3" on:click={addItem}>Add Item</button>
      
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      
      <button type="submit" class="btn btn-success me-2">{editingOrder ? 'Update' : 'Create'} Order</button>
      {#if editingOrder}
        <button type="button" class="btn btn-warning" on:click={cancelEdit}>Cancel Edit</button>
      {/if}
    </form>
  {/if}
  
  {#if loading}
    <p>Loading orders...</p>
  {:else if orders.length === 0}
    <p>No orders found.</p>
  {:else}
    <div class="orders-list">
      {#each orders as order (order.id)}
        <div class="order-card" transition:fade>
          <h2>Order #{order.id}</h2>
          <p>Customer: {order.customerEmail}</p>
          <p class="total">Total: ${order.totalAmount.toFixed(2)}</p>
          <h3>Items:</h3>
          <ul>
            {#each order.items as item}
              <li>Product ID: {item.productId}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}</li>
            {/each}
          </ul>
          <button class="btn btn-secondary me-2" on:click={() => startEdit(order)}>Edit</button>
          <button class="btn btn-danger" on:click={() => handleDelete(order.id, order.customerEmail)}>Delete</button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .orders-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .orders-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .order-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #f8f9fa;
  }

  .order-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .total {
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
</style>