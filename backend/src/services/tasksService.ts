import { Task } from '../types/task';
import { TaskModel } from '../models/taskModel';

class TasksService {
  /**
   * Récupère toutes les tâches depuis MongoDB.
   * @returns {Promise<Task[]>} Liste des tâches.
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await TaskModel.find();
      return tasks.map(task => task.toJSON() as unknown as Task);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
      throw error;
    }
  }

  /**
   * Crée une nouvelle tâche dans MongoDB.
   * @param {Omit<Task, 'id'>} task - Tâche sans ID.
   * @returns {Promise<Task>} La tâche créée.
   */
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const newTask = await TaskModel.create(task);
      return newTask.toJSON() as unknown as Task;
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
      throw error;
    }
  }

  /**
   * Met à jour une tâche dans MongoDB.
   * @param {string} id - ID de la tâche.
   * @param {Partial<Omit<Task, 'id'>>} updates - Champs à mettre à jour.
   * @returns {Promise<Task>} La tâche mise à jour.
   */
  async updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<Task> {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        throw new Error('Task not found');
      }

      return updatedTask.toJSON() as unknown as Task;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      throw error;
    }
  }

  /**
   * Supprime une tâche de MongoDB.
   * @param {string} id - ID de la tâche.
   * @returns {Promise<void>}
   */
  async deleteTask(id: string): Promise<void> {
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(id);

      if (!deletedTask) {
        throw new Error('Task not found');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
      throw error;
    }
  }
}

export const tasksService = new TasksService();

