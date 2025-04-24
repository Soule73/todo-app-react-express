import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTasks } from '../hooks/useTasks';
import InputField from './InputField';
import Button from './Button';

const taskSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  status: z.enum(['pending', 'done']),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  initialData?: TaskFormData & { id: string };
  onClose?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onClose }) => {
  const { createTaskMutation, updateTaskMutation } = useTasks();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: TaskFormData) => {
    if (initialData) {
      updateTaskMutation.mutate({ id: initialData.id, task: data });
    } else {
      createTaskMutation.mutate(data);
    }
    reset();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Titre"
        placeholder="Titre de la tâche"
        register={register('title')}
        error={errors.title?.message}
      />
      <InputField
        label="Description"
        placeholder="Description de la tâche"
        register={register('description')}
        error={errors.description?.message}
      />
      <div>
        <label className="block text-sm font-medium">Statut</label>
        <select {...register('status')} className="w-full px-3 py-2 border rounded">
          <option value="pending">En attente</option>
          <option value="done">Terminée</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>
      <Button type="submit" className="bg-blue-600">
        {initialData ? 'Modifier' : 'Ajouter'}
      </Button>
    </form>
  );
};

export default TaskForm;
