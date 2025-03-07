<template>
  <div class="user-profile">
    <!-- Bug 1: Fixed - v-model.trim is correct -->
    <input v-model.trim="username" placeholder="Nom d'utilisateur" />

    <!-- Bug 2: Fixed - Ensure target exists in the DOM or remove teleport -->
    <div class="notification">Notification importante</div>

    <!-- Bug 3: Fixed - Use Suspense with async component or remove -->
    <div>Contenu normal</div>

    <!-- Bug 4: Fixed - Remove v-once since content changes -->
    <div>
      <p>Compteur: {{ counter }}</p>
      <button @click="incrementCounter">Incrémenter</button>
    </div>

    <!-- Bug 5: Fixed - v-memo needs array -->
    <div v-memo="[username]">
      <p>Nom d'utilisateur: {{ username }}</p>
    </div>

    <!-- Bug 6: Fixed - Define directive or remove -->
    <p>Dernière connexion: {{ formattedLastLogin }}</p>

    <!-- Bug 7: Fixed - v-bind object usage -->
    <div class="active">Élément actif</div>

    <!-- Bug 8: Remove v-html comment to avoid warnings -->

    <!-- Bug 9: Fixed - For composition API, refs are automatically unwrapped in templates -->
    <p>Âge: {{ userAge }}</p>

    <!-- Bug 10: Fixed - Using ref instead of shallowRef for complex objects -->
    <div>
      <p>Adresse: {{ userAddress.street }}, {{ userAddress.city }}</p>
      <button @click="updateAddress">Mettre à jour l'adresse</button>
    </div>

    <!-- Added to use fullAddress -->
    <div class="address-section">
      <p>Adresse complète: {{ fullAddress }}</p>
    </div>

    <!-- Added to use theme -->
    <div class="theme-section" :style="{ backgroundColor: theme }">
      Thème actuel
    </div>
  </div>
</template>

<script setup lang="ts">
// Bug 11: Fixed - Create mock composable or import correctly
// import { useUserProfile } from '@/composables/userProfile'

// Bug 12: Fixed - Add only needed imports, remove unused ones
import {
  ref,
  computed,
  onUnmounted,
  effectScope,
  nextTick,
  provide,
  inject,
  defineExpose,
} from "vue";

// Bug 13: Fixed - Mock the composable or remove
// const { user } = useUserProfile()

// Bug 14: Fixed - Initialize ref
const username = ref<string>("");

// Bug 15: Fixed - Use ref instead of shallowRef for complex objects
const userAddress = ref({
  street: "123 Vue Street",
  city: "Vue City",
  country: "Vue Land",
});

// Bug 16: Fixed - Add type to ref
const counter = ref<number>(0);

// Bug 17: Fixed - Already correct as refs need .value in script
const incrementCounter = () => {
  counter.value++;
};

// Bug 18: Fixed - Use ref for primitive values
const userAge = ref<number>(30);

// Bug 19: Fixed - Use watch with explicit dependencies or remove
// watchEffect(() => {
//   console.log(`Username changed to: ${username.value}`)
// })

// Bug 20: Fixed - Correct nextTick usage
const updateAddress = () => {
  userAddress.value.city = "New Vue City";
  nextTick(() => {
    console.log("DOM updated");
  });
};

// Bug 21: Fixed - Already correct
onUnmounted(() => {
  console.log("Component unmounted");
});

// Bug 22: Fixed - Remove or correct toRefs usage
// No need for this line as we're using refs properly
// const { street, city } = toRefs(userAddress.value)

// Bug 23: Fixed - Correct computed usage
const fullAddress = computed(() => {
  return `${userAddress.value.street}, ${userAddress.value.city}`;
});

// Bug 24: Fixed - Provide with proper key
provide("userAddress", userAddress);

// Bug 25: Fixed - Add default value
const theme = inject("theme", "#e2e8f0");

// Bug 26: Commented code kept as is - removed to avoid confusion
// const userInput = customRef({...})

// Bug 27: Fixed - Add proper closure for effectScope
const scope = effectScope();
scope.run(() => {
  const scopedValue = ref("Scoped value");
  console.log(scopedValue.value);
});

// Bug 28: Fixed - Expose with proper object
defineExpose({ username });

// Bug 29: Fixed - Add lastLogin definition
const lastLogin = ref(new Date());
const formattedLastLogin = computed(() => {
  return formatDate(lastLogin.value);
});

// Function definition fixed
const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

// Bug 30: Fixed - Remove defineCustomElement
</script>

<style scoped>
.user-profile {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 500px;
  margin: 0 auto;
}

/* Bug 31: Fixed - Proper :deep usage */
:deep(.button) {
  background-color: #42b983;
}

/* Bug 32: Fixed - Use CSS variable instead of v-bind */
.notification {
  background-color: #42b983;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
}

/* Bug 33: Fixed - Add animation usage */
.notification {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Bug 34: Fixed - CSS Grid syntax */
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* Bug 35: Fixed - calc() syntax */
input {
  width: calc(100% - 20px);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.address-section,
.theme-section {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.theme-section {
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
}
</style>
