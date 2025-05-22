import axios from 'axios';
import { Task } from '../types/task';

/**
 * Configuration de l'instance Axios pour les appels API.
 */
const api = axios.create({
  baseURL: 'http://localhost:3000/tasks'
});

/**
 * Récupère toutes les tâches.
 * @returns {Promise<Task[]>} Liste des tâches.
 */
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/');
  return response.data;
};

/**
 * Crée une nouvelle tâche.
 * @param {Object} task - Données de la tâche.
 * @param {string} task.title - Titre de la tâche.
 * @param {string} task.description - Description de la tâche.
 * @param {string} task.status - Statut de la tâche ("pending" ou "done").
 * @returns {Promise<Task>} La tâche créée.
 */
export const createTask = async (task: { title: string; description: string; status: string }): Promise<Task> => {
  const response = await api.post('/', task);
  return response.data;
};

/**
 * Met à jour le statut d'une tâche.
 * @param {string} id - ID de la tâche.
 * @param {string} status - Nouveau statut de la tâche ("pending" ou "done").
 * @returns {Promise<Task>} La tâche mise à jour.
 */
export const updateTaskStatus = async (id: string, status: string): Promise<Task> => {
  const response = await api.patch(`/${id}`, { status });
  return response.data;
};

/**
 * Met à jour une tâche complète.
 * @param {string} id - ID de la tâche.
 * @param {Object} task - Données mises à jour de la tâche.
 * @returns {Promise<Task>} La tâche mise à jour.
 */
export const updateTask = async (id: string, task: { title: string; description: string; status: string }): Promise<Task> => {
  const response = await api.patch(`/${id}`, task);
  return response.data;
};

/**
 * Supprime une tâche.
 * @param {string} id - ID de la tâche.
 * @returns {Promise<void>} Aucune réponse.
 */
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};
