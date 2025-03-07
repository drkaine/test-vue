import { defineStore } from "pinia";
import type { Router } from "vue-router";
import { reactive, computed } from "vue";

interface User {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  isLoggedIn: boolean;
  role?: string;
}

interface UserState {
  user: User;
  preferences: Record<string, unknown> | null;
  lastLogin: Date;
}

// Use the setup store syntax which has better TypeScript support
export const useUserStore = defineStore("user", () => {
  // State
  const state = reactive<UserState>({
    user: {
      id: 1,
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      isLoggedIn: false,
      role: "user",
    },
    preferences: null,
    lastLogin: new Date(),
  });

  // Getters
  const isAdmin = computed(() => {
    return state.user.role === "admin";
  });

  const fullName = computed(() => {
    return `${state.user.firstName || ""} ${state.user.lastName || ""}`.trim();
  });

  const userInitials = computed(() => {
    if (!state.user.name) return "";

    return state.user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
  });

  // Actions
  function updateUser(userData: Partial<User>): void {
    state.user = { ...state.user, ...userData };
  }

  async function fetchUserPreferences(): Promise<void> {
    try {
      const response = await fetch("/api/preferences");
      state.preferences = await response.json();
    } catch (error) {
      console.error("Failed to fetch preferences:", error);
    }
  }

  function logout(router?: Router): void {
    state.user.isLoggedIn = false;
    if (router) {
      router.push("/login");
    }
  }

  function resetState(): void {
    state.user = {
      id: 1,
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      isLoggedIn: false,
      role: "user",
    };
    state.preferences = null;
    state.lastLogin = new Date();
  }

  function updateProfile(profile: Partial<User>): void {
    updateUser(profile);
  }

  return {
    state,
    isAdmin,
    fullName,
    userInitials,
    updateUser,
    fetchUserPreferences,
    logout,
    resetState,
    updateProfile,
  };
});

export default useUserStore;
