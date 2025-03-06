<template>
  <div class="about">
    <h1>À propos de cette application</h1>
    <p>Cette application est un exemple de projet Vue 3 avec TypeScript.</p>
    <p>Elle utilise:</p>
    <ul>
      <li>Vue 3 avec la Composition API</li>
      <li>TypeScript pour le typage statique</li>
      <li>Vue Router pour la navigation</li>
      <li>Pinia pour la gestion d'état</li>
      <li>ESLint pour la qualité du code</li>
      <li>Vite pour le build rapide</li>
    </ul>

    <div class="api-response">
      <h2>Données de l'API publique:</h2>
      <p v-if="loading">Chargement...</p>
      <p v-else-if="error">Erreur: {{ error }}</p>
      <div v-else class="data-container">
        <h3>{{ apiData.title }}</h3>
        <p>{{ apiData.body }}</p>
        <p class="data-meta">Post ID: {{ apiData.id }} | User ID: {{ apiData.userId }}</p>
      </div>
      <button @click="fetchData" class="refresh-btn">Rafraîchir</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const apiData = ref<Post>({
  userId: 0,
  id: 0,
  title: '',
  body: ''
});
const loading = ref<boolean>(true);
const error = ref<string>('');

const fetchData = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response =  fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data =  response.json();
    apiData.value = data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('Erreur lors de l\'appel API:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

h1 {
  margin-bottom: 1.5rem;
  color: var(--color-heading);
}

ul {
  text-align: left;
  line-height: 1.8;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.api-response {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  text-align: left;
}

.data-container {
  border-left: 3px solid var(--color-primary);
  padding-left: 1rem;
}

.data-meta {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-top: 1rem;
}

.refresh-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-btn:hover {
  background-color: var(--color-primary-light);
}
</style> 