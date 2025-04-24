import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';
import Button from './components/Button';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Gestion des Tâches</h1>
      <Button type="button" onClick={() => setIsModalOpen(true)} className="bg-blue-600">
        Ajouter une Tâche
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Ajouter une nouvelle tâche</h2>
        <TaskForm onClose={() => setIsModalOpen(false)} /> {/* Passer onClose */}
      </Modal>
      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
