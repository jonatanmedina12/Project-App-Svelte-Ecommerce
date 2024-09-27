import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  return {
    subscribe,
    login: (token: string, user: any) => {
      if (browser) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      set({ isAuthenticated: true, user, token });
    },
    logout: () => {
      if (browser) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      set({ isAuthenticated: false, user: null, token: null });
    },
    initialize: () => {
      if (browser) {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (token && user) {
          set({ isAuthenticated: true, user, token });
        }
      }
    }
  };
};

export const authStore = createAuthStore();