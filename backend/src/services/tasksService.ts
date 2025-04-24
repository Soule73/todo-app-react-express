import { Task } from '../types/task';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE = path.resolve(__dirname, '../../data/tasks.json');

class TasksService {
  /**
   * Lit les tâches depuis le fichier JSON.
   * @returns {Task[]} Liste des tâches.
   */
  private readTasksFromFile(): Task[] {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la lecture des tâches :', error);
      return [];
    }
  }

  /**
   * Écrit les tâches dans le fichier JSON.
   * @param {Task[]} tasks - Liste des tâches à sauvegarder.
   */
  private writeTasksToFile(tasks: Task[]): void {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erreur lors de l\'écriture des tâches :', error);
    }
  }

  /**
   * Récupère toutes les tâches.
   * @returns {Task[]} Liste des tâches.
   */
  getAllTasks(): Task[] {
    return this.readTasksFromFile();
  }

  /**
   * Crée une nouvelle tâche.
   * @param {Omit<Task, 'id'>} task - Tâche sans ID.
   * @returns {Task} La tâche créée.
   */
  createTask(task: Omit<Task, 'id'>): Task {
    const tasks = this.readTasksFromFile();
    const newTask: Task = { id: uuidv4(), ...task };
    tasks.push(newTask);
    this.writeTasksToFile(tasks);
    return newTask;
  }

  /**
   * Met à jour une tâche.
   * @param {string} id - ID de la tâche.
   * @param {Partial<Omit<Task, 'id'>>} updates - Champs à mettre à jour.
   * @returns {Task} La tâche mise à jour.
   */
  updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Task {
    const tasks = this.readTasksFromFile();
    const task = tasks.find((task) => task.id === id);
    if (!task) throw new Error('Task not found');

    Object.assign(task, updates);

    this.writeTasksToFile(tasks);
    return task;
  }

  /**
   * Supprime une tâche.
   * @param {string} id - ID de la tâche.
   */
  deleteTask(id: string): void {
    const tasks = this.readTasksFromFile();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) throw new Error('Task not found');
    tasks.splice(index, 1);
    this.writeTasksToFile(tasks);
  }
}

export const tasksService = new TasksService();

