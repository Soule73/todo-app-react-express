import { Request, Response } from 'express';
import { z } from 'zod';
import { tasksService } from '../services/tasksService';
import { Task, TaskStatus } from '../types/task';

// Schéma de validation pour la création d'une tâche
const taskSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  status: z.nativeEnum(TaskStatus, { errorMap: () => ({ message: 'Le statut doit être "pending" ou "done".' }) }),
});

// Schéma de validation pour la mise à jour d'une tâche
const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
});

export const tasksController = {
  /**
   * Récupère toutes les tâches.
   * @route GET /tasks
   * @returns {Task[]} Liste des tâches.
   */
  getAllTasks: (req: Request, res: Response) => {
    try {
      const tasks = tasksService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  },

  /**
   * Crée une nouvelle tâche.
   * @route POST /tasks
   * @body {title: string, description: string, status: "pending" | "done"}
   * @returns {Task} La tâche créée.
   */
  createTask: (req: Request, res: Response) => {
    try {
      const newTask = taskSchema.parse(req.body); // Validation des données avec Zod
      const createdTask = tasksService.createTask(newTask);
      res.status(201).json(createdTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        }); // Retourne les erreurs de validation avec des détails
      } else {
        console.error('Erreur lors de la création de la tâche :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
      }
    }
  },

  /**
   * Met à jour une tâche.
   * @route PATCH /tasks/:id
   * @param {string} id - L'ID de la tâche.
   * @body {Partial<Task>} - Champs à mettre à jour.
   * @returns {Task} La tâche mise à jour.
   */
  updateTask: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = updateTaskSchema.parse(req.body); // Validation des champs
      const updatedTask = tasksService.updateTask(id, updates);
      res.status(200).json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      } else if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({ error: 'Tâche non trouvée' });
      } else {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
      }
    }
  },

  /**
   * Supprime une tâche.
   * @route DELETE /tasks/:id
   * @param {string} id - L'ID de la tâche.
   * @returns {void}
   */
  deleteTask: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      tasksService.deleteTask(id);
      res.status(204).send(); // Retourne un code 204 sans contenu
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({ error: 'Tâche non trouvée' });
      } else {
        console.error('Erreur lors de la suppression de la tâche :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
      }
    }
  },
};
