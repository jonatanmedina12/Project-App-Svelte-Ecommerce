<script lang="ts">
    import { cart } from '$lib/stores/cart';
  
    // Define the Product interface
    interface Product {
      id: string;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    }
  
    // Explicitly type the product prop
    export let product: Product;
  
    function addToCart() {
      cart.addItem({ ...product, quantity: 1 });
    }
  </script>
  
  <div class="card h-100">
    <img src={product.imageUrl} class="card-img-top" alt={product.name}>
    <div class="card-body">
      <h5 class="card-title">{product.name}</h5>
      <p class="card-text">{product.description}</p>
      <p class="card-text"><strong>${product.price.toFixed(2)}</strong></p>
      <button class="btn btn-primary" on:click={addToCart}>Add to Cart</button>
    </div>
  </div>