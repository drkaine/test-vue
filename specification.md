# Spécifications du Projet Vue 3

## Technologies
- Vue 3 (dernière version)
- TypeScript
- ESLint pour la qualité du code
- Vite comme outil de build

## Architecture
- Approche Component-based
- Composition API
- Types stricts avec TypeScript
- Responsive design (mobile-first)
- Accessibilité de base

## Structure du Projet
```
- src/
  - assets/      # Ressources statiques
  - components/  # Composants réutilisables
  - views/       # Pages/vues de l'application
  - router/      # Configuration du routeur
  - stores/      # État global (si nécessaire)
  - types/       # Types et interfaces TypeScript
  - utils/       # Fonctions utilitaires
- public/        # Fichiers accessibles publiquement
- tests/         # Tests unitaires et e2e
```

## Conventions de Codage
- Utilisation de la Composition API
- Types explicites pour toutes les props, états et fonctions
- Composants avec extension .vue
- Fichiers TypeScript avec extension .ts
- Nommage en PascalCase pour les composants
- Nommage en camelCase pour les fonctions et variables

## Workflow de Développement
- TDD (Test-Driven Development)
- Pair Programming
- Mobile-first pour le développement UI
- Respect des règles ESLint 