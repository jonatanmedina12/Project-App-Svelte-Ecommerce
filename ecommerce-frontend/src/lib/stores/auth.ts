import { writable } from 'svelte/store';

// Define the structure of your user object
interface User {
  username: string;
  // Add other user properties as needed, for example:
  // id: string;
  // email: string;
}

// Define the structure of your auth store state
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    isAuthenticated: false,
    user: null
  });

  return {
    subscribe,
    login: (user: User) => set({ isAuthenticated: true, user }),
    logout: () => set({ isAuthenticated: false, user: null }),
    setUser: (user: User) => update(state => ({ ...state, user }))
  };
}

export const auth = createAuthStore();