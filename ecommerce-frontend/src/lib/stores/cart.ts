import { writable } from 'svelte/store';

// Define an interface for the cart item
interface CartItem {
  price: number;
  id: string | number;
  quantity: number;
  name:string
  // Add other properties as needed
}

function createCartStore() {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  return {
    subscribe,
    addItem: (item: CartItem) => update(items => [...items, item]),
    removeItem: (id: string | number) => update(items => items.filter(item => item.id !== id)),
    clearCart: () => set([]),
    updateQuantity: (id: string | number, quantity: number) => update(items => 
      items.map(item => item.id === id ? {...item, quantity} : item)
    )
  };
}

export const cart = createCartStore();