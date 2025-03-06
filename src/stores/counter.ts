import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // État avec typage
  const count = ref<number>(0);
  const name = ref<string>("Compteur");

  // Getters avec typage
  const doubleCount = computed<number>(() => count.value * 2);
  const nameWithCount = computed<string>(() => `${name.value}: ${count.value}`);

  // Actions
  function increment(): void {
    count.value++;
  }

  function decrement(): void {
    count.value--;
  }

  function reset(): void {
    count.value = 0;
  }

  function setName(newName: string): void {
    name.value = newName;
  }

  return {
    count,
    name,
    doubleCount,
    nameWithCount,
    increment,
    decrement,
    reset,
    setName,
  };
});
