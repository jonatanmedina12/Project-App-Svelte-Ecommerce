<script lang="ts">
    import OrdersForm from '$lib/components/OrderForm.svelte';
    import OrdersList from '$lib/components/OrderList.svelte';
    import 'bootstrap/dist/css/bootstrap.min.css';

    let selectedTab = 'form';
  </script>
  
  <div class="container my-4">
    <h1 class="mb-4">Orders</h1>
  
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a 
          class="nav-link" 
          class:active={selectedTab === 'form'} 
          href="#form"
          on:click|preventDefault={() => selectedTab = 'form'}
        >
          New Order
        </a>
      </li>
      <li class="nav-item">
        <a 
          class="nav-link" 
          class:active={selectedTab === 'list'} 
          href="#list"
          on:click|preventDefault={() => selectedTab = 'list'}
        >
          Order History
        </a>
      </li>
    </ul>
  
    <div class="tab-content">
      {#if selectedTab === 'form'}
        <div class="card">
          <div class="card-body">
            <OrdersForm />
          </div>
        </div>
      {:else if selectedTab === 'list'}
        <OrdersList />
      {/if}
    </div>
  </div>
  
  <style>
    :global(body) {
      background-color: #f8f9fa;
    }
  </style>