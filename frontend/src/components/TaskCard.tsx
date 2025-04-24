import React, { useState } from 'react';
import Button from './Button';
import { Task } from '../types/task';
import Modal from './Modal';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
  onToggleStatus: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleStatus, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{task.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Status:{' '}
          <span
            className={`${
              task.status === 'done' ? 'text-green-500' : 'text-yellow-500'
            }`}
          >
            {task.status === 'done' ? 'Terminer' : 'En attente'}
          </span>
        </p>
        <div className="space-x-2 flex items-center">
          <Button
            onClick={onToggleStatus}
            variant={task.status === 'done' ? 'warning' : 'success'}
            size="sm"
          >
            {task.status === 'done' ? 'En attente' : 'Terminer'}
          </Button>
          <Button onClick={onDelete} variant="error" size="sm">
            Supprimer
          </Button>
          <Button onClick={() => setIsEditModalOpen(true)} variant="info" size="sm">
            Modifier
          </Button>
        </div>
      </div>

      {/* Modal pour modifier la tâche */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
        <TaskForm
          initialData={task}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TaskCard;
