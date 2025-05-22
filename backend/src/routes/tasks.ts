import express from 'express';
import { tasksController } from '../controllers/tasksController';

const router = express.Router();

/**
 * @route GET /tasks
 * @description Récupère toutes les tâches.
 * @returns {Task[]} Liste des tâches.
 * @status 200 - Succès : Renvoie la liste des tâches.
 * @status 500 - Erreur interne du serveur.
 */
router.get('/', tasksController.getAllTasks);

/**
 * @route POST /tasks
 * @description Crée une nouvelle tâche.
 * @body {title: string, description: string, status: "pending" | "done"} Données de la tâche à créer.
 * @returns {Task} La tâche créée.
 * @status 201 - Ressource créée : La tâche a été créée avec succès.
 * @status 400 - Erreur de validation des données.
 * @status 500 - Erreur interne du serveur.
 */
router.post('/', tasksController.createTask);

/**
 * @route PATCH /tasks/:id
 * @description Met à jour une tâche existante.
 * @param {string} id - L'ID de la tâche à mettre à jour.
 * @body {Partial<Task>} Champs à mettre à jour.
 * @returns {Task} La tâche mise à jour.
 * @status 200 - Succès : La tâche a été mise à jour avec succès.
 * @status 400 - Erreur de validation des données.
 * @status 404 - Tâche non trouvée.
 * @status 500 - Erreur interne du serveur.
 */
router.patch('/:id', tasksController.updateTask);

/**
 * @route DELETE /tasks/:id
 * @description Supprime une tâche existante.
 * @param {string} id - L'ID de la tâche à supprimer.
 * @returns {void} Aucun contenu.
 * @status 204 - Succès : La tâche a été supprimée avec succès.
 * @status 404 - Tâche non trouvée.
 * @status 500 - Erreur interne du serveur.
 */
router.delete('/:id', tasksController.deleteTask);

export default router;
