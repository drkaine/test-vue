<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
const error = ref<string | null>(null);
const catImageUrl = ref<string | null>(null);

const fetchCat = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch("https://cataas.com/cat", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    const imageResponse = await fetch(`https://cataas.com/cat?${data.id}`);
    catImageUrl.value = imageResponse.url;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <h1>Photo de chat</h1>
    <div v-if="loading">
      <p>Chargement...</p>
    </div>
    <div v-else>
      <button @click="fetchCat">Changer de chat</button>
      <img v-if="catImageUrl" :src="catImageUrl" alt="Photo de chat" />
    </div>
  </div>
</template>
