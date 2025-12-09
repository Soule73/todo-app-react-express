import mongoose from 'mongoose';

/**
 * URL de connexion à MongoDB
 * Par défaut: mongodb://localhost:27017/todo-app
 * Peut être surchargée via la variable d'environnement MONGODB_URI
 */
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Établit la connexion à MongoDB
 * @returns {Promise<void>}
 */
export const connectDatabase = async (): Promise<void> => {
    if (!MONGODB_URI) {
        throw new Error("La variable d'environnement MONGODB_URI n'est pas définie.");
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connexion à MongoDB établie avec succès');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1);
    }
};

/**
 * Ferme la connexion à MongoDB
 * @returns {Promise<void>}
 */
export const disconnectDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('Déconnexion de MongoDB réussie');
    } catch (error) {
        console.error('Erreur lors de la déconnexion de MongoDB:', error);
    }
};

/**
 * Gestion des événements de connexion MongoDB
 */
mongoose.connection.on('connected', () => {
    console.log('Mongoose connecté à MongoDB');
});

mongoose.connection.on('error', (error) => {
    console.error('Erreur de connexion Mongoose:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose déconnecté de MongoDB');
});
