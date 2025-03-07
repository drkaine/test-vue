<template>
  <div class="user-profile">
    <!-- Bug 1: Utilisation de v-model avec modificateur inexistant -->
    <input v-model.invalid="username" placeholder="Nom d'utilisateur">
    
    <!-- Bug 2: Utilisation incorrecte de Teleport (sans cible valide) -->
    <teleport to="#non-existent">
      <div class="notification">Notification importante</div>
    </teleport>
    
    <!-- Bug 3: Utilisation de Suspense sans composant asynchrone -->
    <Suspense>
      <template #default>
        <div>Contenu normal</div>
      </template>
      <template #fallback>
        Chargement...
      </template>
    </Suspense>
    
    <!-- Bug 4: Utilisation de v-once sur un élément qui change -->
    <div v-once>
      <p>Compteur: {{ counter }}</p>
      <button @click="incrementCounter">Incrémenter</button>
    </div>
    
    <!-- Bug 5: Utilisation incorrecte de v-memo -->
    <div v-memo="username">
      <p>Nom d'utilisateur: {{ username }}</p>
    </div>
    
    <!-- Bug 6: Directive personnalisée utilisée sans être définie -->
    <p v-format-date="lastLogin">Dernière connexion</p>
    
    <!-- Bug 7: Utilisation incorrecte de v-bind avec un objet -->
    <div v-bind="{ class: 'active' }">Élément actif</div>
    
    <!-- Bug 8: Utilisation de v-html avec contenu potentiellement dangereux -->
    <div v-html="userInput"></div>
    
    <!-- Bug 9: Utilisation de ref dans le template sans .value -->
    <p>Âge: {{ userAge }}</p>
    
    <!-- Bug 10: Utilisation de shallowRef pour un objet complexe -->
    <div>
      <p>Adresse: {{ userAddress.street }}, {{ userAddress.city }}</p>
      <button @click="updateAddress">Mettre à jour l'adresse</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Bug 11: Import de composable inexistant
import { useUserProfile } from '@/composables/userProfile'

// Bug 12: Imports incomplets
import { ref, shallowRef, onUnmounted } from 'vue'

// Bug 13: Définition de composable incorrecte
const { user } = useUserProfile()

// Bug 14: Utilisation de ref sans initialisation
const username = ref()

// Bug 15: Utilisation de shallowRef pour un objet complexe
const userAddress = shallowRef({
  street: '123 Vue Street',
  city: 'Vue City',
  country: 'Vue Land'
})

// Bug 16: Définition de ref sans type
const counter = ref(0)

// Bug 17: Fonction qui modifie une ref sans .value
const incrementCounter = () => {
  counter++
}

// Bug 18: Utilisation de reactive pour une valeur primitive
const userAge = reactive(30)

// Bug 19: Utilisation de watchEffect sans dépendances explicites
watchEffect(() => {
  console.log(`Username changed to: ${username}`)
})

// Bug 20: Utilisation incorrecte de nextTick
const updateAddress = () => {
  userAddress.value.city = 'New Vue City'
  nextTick.then(() => {
    console.log('DOM updated')
  })
}

// Bug 21: Utilisation incorrecte de onUnmounted
onUnmounted = () => {
  console.log('Component unmounted')
}

// Bug 22: Utilisation de toRefs sans reactive
const { street, city } = toRefs(userAddress.value)

// Bug 23: Utilisation de computed sans fonction de retour
const fullAddress = computed(userAddress.value.street + ', ' + userAddress.value.city)

// Bug 24: Utilisation de provide sans clé
provide(userAddress)

// Bug 25: Utilisation de inject sans valeur par défaut pour une clé potentiellement absente
const theme = inject('theme')

// Bug 26: Utilisation de customRef incorrecte
const userInput = customRef({
  get: () => '<script>alert("XSS")</script>',
  set: (value) => {}
})

// Bug 27: Utilisation de effectScope sans fermeture
const scope = effectScope()
scope.run(() => {
  // Pas de logique
})

// Bug 28: Utilisation de defineExpose sans objet
defineExpose(username)

// Bug 29: Utilisation de lastLogin sans définition
const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Bug 30: Utilisation de defineCustomElement sans composant valide
defineCustomElement({
  template: '<div>Custom Element</div>'
})
</script>

<style scoped>
.user-profile {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 500px;
  margin: 0 auto;
}

/* Bug 31: Utilisation de :deep() incorrecte */
:deep(.button) {
  background-color: #42b983;
}

/* Bug 32: Utilisation de v-bind dans CSS sans variable */
.notification {
  background-color: v-bind(theme);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
}

/* Bug 33: Utilisation de @keyframes sans animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Bug 34: Utilisation de CSS Grid incorrecte */
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr;
  gap: 1rem;
}

/* Bug 35: Utilisation de calc() incorrecte */
input {
  width: calc(100% - 20px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style> 