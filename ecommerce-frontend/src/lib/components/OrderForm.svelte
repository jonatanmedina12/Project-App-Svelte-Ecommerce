<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { createOrder } from '$lib/services/api';
  
    let shippingAddress = '';
    let loading = false;
    let error: string | null = null;
  
    $: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    async function submitOrder() {
      loading = true;
      error = null;
      try {
        const orderData = {
          items: $cart,
          shippingAddress,
          total
        };
        await createOrder(orderData);
        cart.clearCart();
        // Redirect to order confirmation or orders list
      } catch (e) {
         if (e instanceof Error) {
          error = e.message;
        } else {
          error = 'An unknown error occurred';
        }
      } finally {
        loading = false;
      }
    }
  </script>
  
  <form on:submit|preventDefault={submitOrder}>
    <h2>Order Summary</h2>
    {#each $cart as item (item.id)}
      <div class="mb-3">
        <span>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</span>
      </div>
    {/each}
    <div class="mb-3">
      <strong>Total: ${total.toFixed(2)}</strong>
    </div>
    <div class="mb-3">
      <label for="shippingAddress" class="form-label">Shipping Address</label>
      <textarea id="shippingAddress" class="form-control" bind:value={shippingAddress} required></textarea>
    </div>
    {#if error}
      <div class="alert alert-danger" role="alert">
        {error}
      </div>
    {/if}
    <button type="submit" class="btn btn-primary" disabled={loading || $cart.length === 0}>
      {loading ? 'Processing...' : 'Place Order'}
    </button>
  </form>