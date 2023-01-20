import {DocumentDefinition, FilterQuery} from "mongoose";
import Task, {TaskDocument} from "../model/task.model";

export function createTask(input: DocumentDefinition<TaskDocument>) {
    return Task.create(input);
}

export async function findTasks(query: FilterQuery<TaskDocument>) {
    return Task.find(query).lean();
}