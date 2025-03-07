<template>
  <div class="hello-world">
    <h2>{{ msg }}</h2>
    <div class="card">
      <button type="button" @click="count++">
        Le compteur est à {{ count }}
      </button>
    </div>
    <p class="mt-4">
      Consultez
      <a href="https://vuejs.org/" target="_blank">la documentation de Vue</a>
      pour en savoir plus.
    </p>
    <p>
      <a href="https://vitejs.dev/guide/" target="_blank">Vite</a> |
      <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
    </p>
  </div>

  <Hello />
</template>

<script setup lang="ts">
import Hello from "./HelloMessage.vue";
import { ref } from "vue";

defineProps<{
  msg: string;
}>();

const count = ref<number>(0);
</script>

<style scoped>
.hello-world {
  margin-top: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
}

.card button {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card button:hover {
  background-color: var(--color-primary-light);
}

a {
  margin: 0 0.5rem;
  font-weight: 500;
}
</style>
