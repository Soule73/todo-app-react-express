import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasksApi';

/**
 * Hook pour gérer les tâches.
 */
export const useTasks = () => {
  const queryClient = useQueryClient();

  /**
   * Récupère toutes les tâches.
   */
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  /**
   * Mutation pour créer une nouvelle tâche.
   */
  const createTaskMutation = useMutation({
    mutationFn: (task: { title: string; description: string; status: string }) => createTask(task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  /**
   * Mutation pour mettre à jour une tâche.
   */
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: { title: string; description: string; status: string } }) =>
      updateTask(id, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  /**
   * Mutation pour supprimer une tâche.
   */
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return {
    tasksQuery,
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};
