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
import { useUserProfile } from '@/composables/userProfile'

import { ref, shallowRef, onUnmounted } from 'vue'

const { user } = useUserProfile()

const username = ref()

const userAddress = shallowRef({
  street: '123 Vue Street',
  city: 'Vue City',
  country: 'Vue Land'
})

const counter = ref(0)

const incrementCounter = () => {
  counter++
}

const userAge = reactive(30)

watchEffect(() => {
  console.log(`Username changed to: ${username}`)
})

const updateAddress = () => {
  userAddress.value.city = 'New Vue City'
  nextTick.then(() => {
    console.log('DOM updated')
  })
}

onUnmounted = () => {
  console.log('Component unmounted')
}

const { street, city } = toRefs(userAddress.value)

const fullAddress = computed(userAddress.value.street + ', ' + userAddress.value.city)

provide(userAddress)

const theme = inject('theme')

const userInput = customRef({
  get: () => '<script>alert("XSS")</script>',
  set: (value) => {}
})

const scope = effectScope()
scope.run(() => {
})

defineExpose(username)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

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

:deep(.button) {
  background-color: #42b983;
}

.notification {
  background-color: v-bind(theme);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 1rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr;
  gap: 1rem;
}

input {
  width: calc(100% - 20px);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style> 