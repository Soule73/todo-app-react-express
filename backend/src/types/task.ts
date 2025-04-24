/**
 * Enumération des statuts possibles pour une tâche.
 */
export enum TaskStatus {
  Pending = 'pending',
  Done = 'done',
}

/**
 * Interface représentant une tâche.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
