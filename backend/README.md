# Backend - Gestion des Tâches

Ce projet est un backend pour la gestion des tâches, développé avec **Node.js**, **Express**, et **TypeScript**. Il utilise un fichier JSON pour stocker les données.

---

## Prérequis

- **Node.js** (version 18.x ou supérieure recommandée)
- **npm** (installé avec Node.js)

---

## Installation

1. **Clonez le projet** :
   ```bash
   git clone <url-du-repo>
   cd todo-app/backend
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

---

## Scripts disponibles

### 1. **Démarrer en mode développement**
   Utilisez `ts-node` pour démarrer le serveur sans compilation :
   ```bash
   npm run dev
   ```

### 2. **Compiler le projet**
   Compilez le projet TypeScript en JavaScript :
   ```bash
   npm run build
   ```

### 3. **Démarrer le serveur compilé**
   Après la compilation, démarrez le serveur :
   ```bash
   npm start
   ```

---

## Structure du projet

- **`src/`** : Contient le code source TypeScript.
  - **`controllers/`** : Contient la logique des routes.
  - **`routes/`** : Définit les routes de l'API.
  - **`services/`** : Gère les opérations sur les données.
  - **`types/`** : Définit les types TypeScript utilisés dans le projet.
- **`data/`** : Contient le fichier `tasks.json` pour stocker les données.

---

## Tester les routes

Vous pouvez tester les routes avec **Postman**, **cURL**, ou tout autre outil de test HTTP.

### 1. **GET `/tasks`**
- **Description** : Récupère toutes les tâches.
- **Requête** :
  ```bash
  curl -X GET http://localhost:3000/tasks
  ```
- **Réponse attendue** (exemple) :
  ```json
  [
    {
      "id": "1a2b3c4d",
      "title": "Nouvelle tâche",
      "description": "Description de la tâche",
      "status": "pending"
    }
  ]
  ```

---

### 2. **POST `/tasks`**
- **Description** : Crée une nouvelle tâche.
- **Requête** :
  ```bash
  curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle tâche",
    "description": "Description de la tâche",
    "status": "pending"
  }'
  ```
- **Réponse attendue** (exemple) :
  ```json
  {
    "id": "2b3c4d5e",
    "title": "Nouvelle tâche",
    "description": "Description de la tâche",
    "status": "pending"
  }
  ```

---

### 3. **PATCH `/tasks/:id`**
- **Description** : Met à jour le statut d'une tâche.
- **Requête** :
  ```bash
  curl -X PATCH http://localhost:3000/tasks/1a2b3c4d \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done"
  }'
  ```
- **Réponse attendue** (exemple) :
  ```json
  {
    "id": "1a2b3c4d",
    "title": "Nouvelle tâche",
    "description": "Description de la tâche",
    "status": "done"
  }
  ```

---

### 4. **DELETE `/tasks/:id`**
- **Description** : Supprime une tâche par son ID.
- **Requête** :
  ```bash
  curl -X DELETE http://localhost:3000/tasks/1a2b3c4d
  ```
- **Réponse attendue** :
  - **Code HTTP** : `204 No Content` (aucun contenu dans la réponse).

---

## Notes

- Assurez-vous que le fichier `data/tasks.json` est accessible en lecture et écriture.
- Si vous rencontrez des problèmes, vérifiez les logs du serveur pour des messages d'erreur.
