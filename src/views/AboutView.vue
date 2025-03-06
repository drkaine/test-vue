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
  </div>
</template>

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
</style>