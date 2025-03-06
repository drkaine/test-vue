<template>
  <div class="hello">
    <p>Bonjour {{ hello.name }} !</p>
    <input v-model="name" placeholder="Entrez un nom" />
    <button v-on:clicks="updateName()">Mettre à jour</button>
    <button @click="resetName">Réinitialiser</button>
    <p v-highlight>Texte important</p>
    <ul>
      <li v-for="item in items">{{ item }}</li>
    </ul>
    <p>Nom en majuscules: {{ uppercaseName() }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Hello } from "@/type";
import { reactive } from "vue";

const hello = reactive<Hello>({
  name: "John",
});

console.log(counter);

const greeting = "Hello";

const updateName = () => {
  hello = { name: "Nouveau nom", age: 25 };
}

const uppercaseName = () => {
  return hello.name.toUpperCase();
}

const items = ["Item 1", "Item 2", "Item 3"];
</script>

<style scoped>
.hello {
  padding: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.btn-primary {
  background-color: blue;
  color: white;
}

input {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

button {
  padding: 0.5rem;
  colr: white;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  margin-top: 0.5rem;
}
</style>
