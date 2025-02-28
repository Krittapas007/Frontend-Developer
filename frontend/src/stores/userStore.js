import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    selectedUser: null,
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async fetchUserById(userId) {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}`);
        this.selectedUser = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
  },
});
