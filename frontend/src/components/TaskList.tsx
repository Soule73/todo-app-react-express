import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, deleteTask, updateTaskStatus } from '../api/tasksApi'; 
import { Task } from '../types/task';
import TaskCard from './TaskCard';

const TaskList = () => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateTaskStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="shadow overflow-hidden sm:rounded-md mx-auto divide-y divide-gray-200 border border-gray-200">
      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={() =>
            updateMutation.mutate({ id: task.id, status: task.status === 'pending' ? 'done' : 'pending' })
          }
          onDelete={() => deleteMutation.mutate(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
