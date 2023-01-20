import mongoose from "mongoose";
import {UserDocument} from "./user.model";

/**
 * TaskDocument Interface
 */
export interface TaskDocument extends mongoose.Document {
    user: UserDocument["_id"]
    name: string
    createdAt: Date
    updatedAt: Date
}

const TaskSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    },
    {timestamps: true}
);

const Task = mongoose.model<TaskDocument>("Task", TaskSchema);

export default Task;