<template>
  <div class="home">
    <h1>Bienvenue sur votre application Vue 3 avec TypeScript</h1>
    <p class="mb-4">Cette application est configurée avec Vue 3, TypeScript et ESLint.</p>
    
    <HelloWorld msg="Bonjour Vue 3 + TypeScript" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem 0;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
}
</style> 