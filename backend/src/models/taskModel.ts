import mongoose, { Schema, Document } from 'mongoose';
import { Task, TaskStatus } from '../types/task';

/**
 * Interface pour le document MongoDB Task
 */
export interface TaskDocument extends Omit<Task, 'id'>, Document { }

/**
 * Schéma Mongoose pour les tâches
 */
const taskSchema = new Schema<TaskDocument>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.Pending,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret: any) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            return ret;
        },
    },
});

/**
 * Modèle Mongoose pour les tâches
 */
export const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
