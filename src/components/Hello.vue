<template>
  <div class="hello">
    <p>Bonjour {{ hello.name }} !</p>
    <input v-model="name" placeholder="Entrez un nom" />
  </div>
</template>

<script setup lang="ts">
import type { Hello } from "@/type";
import { reactive } from "vue";

const hello = reactive<Hello>({
  name: "John",
});
</script>

<style scoped>
.hello {
  padding: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--color-border);
}

input {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}
</style>
