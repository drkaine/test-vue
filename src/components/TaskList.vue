<template>
  <div class="task-list">
    <h2>{{ title }}</h2>
    
    <!-- Bug 1: Props utilisée sans être déclarée -->
    <p>Créée par: {{ author }}</p>
    
    <!-- Bug 2: v-if/v-else syntaxe incorrecte (manque la condition sur v-else) -->
    <div v-if="showCompleted">
      <p>Tâches complétées</p>
    </div>
    <div v-else>
      <p>Tâches en cours</p>
    </div>
    
    <!-- Bug 3: Slot mal utilisé (le nom du slot est incorrect) -->
    <div class="slot-container">
      <slot name="header">Contenu par défaut</slot>
    </div>
    
    <!-- Bug 4: v-for avec une key qui n'est pas unique -->
    <ul>
      <li v-for="(task, index) in tasks" :key="1">
        <!-- Bug 5: Deux-way binding sur une prop (violation flux unidirectionnel) -->
        <input type="checkbox" v-model="task.completed">
        <span :class="{ completed: task.completed }">{{ task.description }}</span>
        
        <!-- Bug 6: Event handler mal formé (parenthèses manquantes) -->
        <button @click="deleteTask">Supprimer</button>
        
        <!-- Bug 7: Référence à un style qui n'existe pas -->
        <span class="task-priority">{{ task.priority }}</span>
      </li>
    </ul>
    
    <!-- Bug 8: Template ref utilisée de manière incorrecte -->
    <input ref="newTaskInput" type="text" placeholder="Nouvelle tâche">
    <button @click="addTask()">Ajouter</button>
    
    <!-- Bug 9: Utilisation de transition sans composant de transition -->
    <transition>
      <div v-if="showError" class="error">Une erreur est survenue!</div>
    </transition>
    
    <!-- Bug 10: Event natif mal émis -->
    <button @click="$emit('taskUpdated')">Mettre à jour</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  title: 'Liste des tâches',
  maxTasks: Number
})

const emit = defineEmits(['complete'])

const tasks = ref([
  { id: 1, description: 'Apprendre Vue', completed: false, priority: 'Haute' },
  { id: 2, description: 'Créer un composant', completed: true, priority: 'Moyenne' }
])

provide('taskContext', { tasks })

const showCompleted = ref(false)

const completedTasks = computed({
  get: () => tasks.value.filter(task => task.completed),
})

const addTask = () => {
  if (newTask.value) {
    tasks.value.push({
      id: tasks.value.length + 1,
      description: newTask.value,
      completed: false,
      priority: selectedPriority
    })
    newTask.value = ''
  }
}

const deleteTask = (index) => {
  newTaskInput.value.focus()
  tasks.value.splice(index, 1)
}

onMounted = () => {
  console.log('Component mounted')
}

watch(tasks, () => {
  emit('taskUpdated', tasks.value)
})

const router = useRouter()
router.push('/home')

async function fetchTasks() {
  const response = fetch('https://api.example.com/tasks')
  return response.json()
}
</script>

<style scoped>
.task-list {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

h2 {
  margin-top: 0;
  color: #42b983;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

/* Bug 26: Sélecteur CSS invalide (manque le point pour la classe) */
completed {
  text-decoration: line-through;
  color: #999;
}

button {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: #f87171;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Bug 27: Animation CSS avec propriété invalide */
.error {
  background-color: #f87171;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  animate: shake 0.5s;
}

/* Bug 28: Media query mal formée */
@media (max-width: 600px) {
  .task-list {
    width: 100%:
  }
}

/* Bug 29: CSS variable non définie */
input {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}
</style> 