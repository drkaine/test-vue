<template>
  <div class="hello">
    <p>Bonjour {{ hello.name }}!</p>
  </div>
</template>

<script setup lang="ts">
import type { Hello } from "@/type";

const hello: Hello = {
  name: "John",
};
</script>

<style scoped>
.hello {
  padding: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--color-border);
}
</style>
