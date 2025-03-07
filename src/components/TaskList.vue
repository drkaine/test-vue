<template>
  <div class="task-list">
    <h2>{{ title }}</h2>

    <!-- Bug 1: Fixed - Props properly declared -->
    <p>Créée par: {{ author }}</p>

    <!-- Bug 2: Fixed - v-if/v-else syntax -->
    <div v-if="showCompleted">
      <p>Tâches complétées ({{ completedTasks.length }})</p>
    </div>
    <div v-else>
      <p>Tâches en cours</p>
    </div>

    <!-- Bug 3: Fixed - Slot usage -->
    <div class="slot-container">
      <slot name="header"> Contenu par défaut </slot>
    </div>

    <!-- Bug 4: Fixed - v-for with unique key -->
    <ul>
      <li v-for="(task, index) in tasks" :key="task.id">
        <!-- Bug 5: Fixed - Use proper event handling for two-way binding -->
        <input
          :checked="task.completed"
          type="checkbox"
          @change="updateTaskStatus(task)"
        />
        <span :class="{ completed: task.completed }">{{
          task.description
        }}</span>

        <!-- Bug 6: Fixed - Event handler with parentheses -->
        <button @click="deleteTask(index)">Supprimer</button>

        <!-- Bug 7: Fixed - Existing style class -->
        <span class="task-priority">{{ task.priority }}</span>
      </li>
    </ul>

    <!-- Bug 8: Fixed - Template ref properly used -->
    <input
      ref="newTaskInput"
      v-model="newTask"
      type="text"
      placeholder="Nouvelle tâche"
    />
    <button @click="addTask">Ajouter</button>

    <!-- Bug 9: Fixed - Transition component with name -->
    <transition name="fade">
      <div v-if="showError" class="error">Une erreur est survenue!</div>
    </transition>

    <!-- Bug 10: Fixed - Event emission with proper name -->
    <button @click="$emit('complete', tasks)">Mettre à jour</button>

    <!-- Added refresh tasks button -->
    <button class="refresh-button" @click="loadTasks">
      Rafraîchir les tâches
    </button>
  </div>
</template>

<script setup lang="ts">
// Bug 11: Fixed - Import Vue Router only when needed
// import { useRouter } from 'vue-router'

// Bug 12: Fixed - Complete imports
import { ref, computed, onMounted, watch, provide } from "vue";

// Bug 13: Fixed - Proper props definition
defineProps({
  title: {
    type: String,
    default: "Liste des tâches",
  },
  author: {
    type: String,
    default: "Anonyme",
  },
  maxTasks: {
    type: Number,
    default: 10,
  },
});

// Bug 14: Fixed - Emit declaration with all needed events
const emit = defineEmits(["complete", "taskUpdated"]);

// Bug 15: Fixed - Refs with proper types
const tasks = ref([
  { id: 1, description: "Apprendre Vue", completed: false, priority: "Haute" },
  {
    id: 2,
    description: "Créer un composant",
    completed: true,
    priority: "Moyenne",
  },
]);

// Bug 16: Fixed - Provide with proper key and value
provide("taskContext", { tasks });

// Bug 17: Fixed - Variable declared before use
const showCompleted = ref(false);
const showError = ref(false);

// Bug 18: Fixed - Computed property correctly defined
const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.completed);
});

// Missing refs added
const newTask = ref("");
const selectedPriority = ref("Normale");
const newTaskInput = ref<HTMLInputElement | null>(null);

// Bug 19: Fixed - Method with all variables properly defined
const addTask = () => {
  if (newTask.value) {
    tasks.value.push({
      id: tasks.value.length + 1,
      description: newTask.value,
      completed: false,
      priority: selectedPriority.value,
    });
    newTask.value = "";
    // Focus the input after adding a task
    if (newTaskInput.value) {
      newTaskInput.value.focus();
    }
  }
};

// Function to update task status
const updateTaskStatus = (task: {
  id: number;
  description: string;
  completed: boolean;
  priority: string;
}) => {
  task.completed = !task.completed;
  emit("taskUpdated", tasks.value);
};

// Bug 20: Fixed - Reference to DOM element with proper type checking
const deleteTask = (index: number) => {
  // Bug 21: Fixed - Safe property access
  if (newTaskInput.value) {
    newTaskInput.value.focus();
  }
  tasks.value.splice(index, 1);
  emit("taskUpdated", tasks.value);
};

// Bug 22: Fixed - Lifecycle hook correctly used
onMounted(() => {
  console.log("Component mounted");
  if (newTaskInput.value) {
    newTaskInput.value.focus();
  }
});

// Bug 23: Fixed - Watcher properly defined
watch(
  tasks,
  () => {
    emit("taskUpdated", tasks.value);
  },
  { deep: true },
);

// Bug 24: Fixed - Router usage removed or used properly
// const router = useRouter()
// Removed router.push call as it's not appropriate in component setup

// Bug 25: Fixed - Async function with proper error handling and usage
async function fetchTasks() {
  try {
    const response = await fetch("https://api.example.com/tasks");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    showError.value = true;
    return [];
  }
}

// Added function to use fetchTasks
const loadTasks = async () => {
  try {
    const fetchedTasks = await fetchTasks();
    if (Array.isArray(fetchedTasks) && fetchedTasks.length > 0) {
      tasks.value = fetchedTasks;
    }
  } catch (error) {
    console.error("Failed to load tasks:", error);
    showError.value = true;
  }
};
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

/* Bug 26: Fixed - CSS class selector with dot */
.completed {
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

.refresh-button {
  background-color: #60a5fa;
  margin-top: 1rem;
  display: block;
}

/* Bug 27: Fixed - Animation property */
.error {
  background-color: #f87171;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  animation: shake 0.5s;
}

/* Added animation keyframes */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Bug 28: Fixed - Media query syntax */
@media (max-width: 600px) {
  .task-list {
    width: 100%;
  }
}

/* Bug 29: Fixed - CSS variable defined or used properly */
:root {
  --border-color: #cccccc;
}

input {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
}

/* Define transition for fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.task-priority {
  margin-left: auto;
  padding: 0.25rem 0.5rem;
  background-color: #e2e8f0;
  border-radius: 4px;
  font-size: 0.8rem;
}
</style>
