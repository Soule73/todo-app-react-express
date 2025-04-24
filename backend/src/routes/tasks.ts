import express from 'express';
import { tasksController } from '../controllers/tasksController';

const router = express.Router();

/**
 * @route GET /tasks
 * @description Récupère toutes les tâches
 * @returns {Task[]} Liste des tâches
 * @status 200 - Succès
 * @status 500 - Erreur interne du serveur
 */
router.get('/', tasksController.getAllTasks);

/**
 * @route POST /tasks
 * @description Crée une nouvelle tâche
 * @body {title: string, description: string, status: "pending" | "done"}
 * @returns {Task} La tâche créée
 * @status 201 - Ressource créée
 * @status 400 - Erreur de validation des données
 * @status 500 - Erreur interne du serveur
 */
router.post('/', tasksController.createTask);

/**
 * @route PATCH /tasks/:id
 * @description Met à jour une tâche
 * @param {string} id - L'ID de la tâche
 * @body {Partial<Task>} - Champs à mettre à jour
 * @returns {Task} La tâche mise à jour
 */
router.patch('/:id', tasksController.updateTask);

export default router;
