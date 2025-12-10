// auth.ts (ejemplo Pinia)
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }),
  actions: {
    login(username: string) { this.user = username; },
  },
});