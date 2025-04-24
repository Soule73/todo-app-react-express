# Frontend - Gestion des Tâches

Ce projet est le frontend de l'application de gestion des tâches, développé avec **React**, **TypeScript**, et **Vite**. Il utilise **React Query** pour la gestion des requêtes API et **Tailwind CSS** pour le design.

---

## Prérequis

- **Node.js** (version 18.x ou supérieure recommandée)
- **npm** (installé avec Node.js)

---

## Installation

1. **Clonez le projet** :
   ```bash
   git clone <url-du-repo>
   cd todo-app/frontend
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

---

## Scripts disponibles

### 1. **Démarrer en mode développement**
   Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

   Accédez à l'application dans votre navigateur à l'adresse [http://localhost:5173](http://localhost:5173).

### 2. **Compiler le projet**
   Compilez le projet pour la production :
   ```bash
   npm run build
   ```

### 3. **Prévisualiser le build**
   Prévisualisez le build de production :
   ```bash
   npm run preview
   ```

---

## Structure du projet

- **`src/`** : Contient le code source de l'application.
  - **`api/`** : Contient les appels API vers le backend.
  - **`components/`** : Contient les composants réutilisables.
  - **`hooks/`** : Contient les hooks personnalisés.
  - **`types/`** : Définit les types TypeScript utilisés dans le projet.
  - **`App.tsx`** : Composant principal de l'application.
  - **`main.tsx`** : Point d'entrée de l'application.

---

## Fonctionnalités

### 1. **Affichage de la liste des tâches**
- Les tâches sont récupérées depuis le backend et affichées sous forme de cartes.
- Chaque carte affiche le titre, la description et le statut de la tâche.

### 2. **Ajout d'une nouvelle tâche**
- Cliquez sur le bouton "Ajouter une Tâche" pour ouvrir un modal avec un formulaire.
- Remplissez le formulaire et soumettez-le pour ajouter une nouvelle tâche.

### 3. **Modification d'une tâche**
- Cliquez sur le bouton "Modifier" dans une carte pour ouvrir un modal avec un formulaire pré-rempli.
- Modifiez les champs et soumettez le formulaire pour mettre à jour la tâche.

### 4. **Suppression d'une tâche**
- Cliquez sur le bouton "Supprimer" dans une carte pour supprimer la tâche.

### 5. **Mise à jour du statut**
- Cliquez sur le bouton "Terminer" ou "En attente" dans une carte pour basculer le statut de la tâche.

---

## Technologies utilisées

- **React** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **TypeScript** : Superset de JavaScript pour un typage statique.
- **Vite** : Outil de build rapide pour les projets frontend.
- **React Query** : Gestion des requêtes API et du cache.
- **Tailwind CSS** : Framework CSS utilitaire pour le design.
- **Axios** : Client HTTP pour les appels API.
- **Zod** : Validation des données côté client.
- **React Hook Form** : Gestion des formulaires.

---

## Notes

- Assurez-vous que le backend est en cours d'exécution à l'adresse [http://localhost:3000](http://localhost:3000).
- Si vous rencontrez des problèmes, vérifiez les logs du navigateur et du terminal.