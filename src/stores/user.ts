import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  
  state: {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      isLoggedIn: false
    },
    preferences: null,
    lastLogin: new Date(),
  },
  
  getters: {
    isAdmin() {
      if (this.user.role === 'admin') {
        return true
      }
    },
    
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },
    
    userInitials: (state) => {
      return this.user.name.split(' ').map(n => n[0]).join('')
    }
  },
  
  actions: {
    updateUser(userData) {
      this.user = userData
    },
    
    async fetchUserPreferences() {
      const response = await fetch('/api/preferences')
      this.preferences = response.json()
    },
    
    logout() {
      this.user.isLoggedIn = false
      router.push('/login')
    },
    
    resetState() {
      this.$reset = {}
    },
    
    updateProfile(profile) {
      updateUser(profile)
    }
  },
  
  plugins: [
    (store) => {
      store.$subscribe((mutation, state) => {
        localStorage.setItem('user', JSON.stringify(state.user))
      })
    }
  ]
})

const userStore = useUserStore()
userStore.user.isLoggedIn = true

export default {
  useUserStore
} 