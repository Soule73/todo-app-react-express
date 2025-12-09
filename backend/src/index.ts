import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/tasks';
import { connectDatabase } from './config/database';

const app = express();
const PORT = 3000;

// Middleware pour activer CORS
app.use(cors({
  origin: 'http://localhost:5173', // Autoriser uniquement le frontend
}));

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Routes pour les tâches
app.use('/tasks', taskRoutes);

// Connexion à MongoDB puis démarrage du serveur
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Impossible de démarrer le serveur:', error);
  process.exit(1);
});
