<script lang="ts">
    import { onMount } from 'svelte';
    import { getOrders } from '$lib/services/api';
  
    let orders: any[] = [];
    let loading = true;
    let error: string | null = null;
  
    onMount(async () => {
      try {
        orders = await getOrders();
      } catch (e) {
  if (e instanceof Error) {
          error = e.message;
        } else {
          error = 'An unknown error occurred';
        }      } finally {
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
    <table class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {#each orders as order (order.id)}
          <tr>
            <td>{order.id}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>${order.total.toFixed(2)}</td>
            <td>{order.status}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}