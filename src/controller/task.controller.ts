import {Request, Response} from "express";
import {get} from "lodash";
import {createTask, findTasks} from "../service/task.service";
import {findUser} from "../service/user.service";

/**
 * @param request
 * @param response
 */
export async function createTaskHandler(request: Request, response: Response) {

    const userId = get(request, "user._id");
    const body = request.body;
    const post = await createTask({...body, user: userId});

    return response.send(post);
}

/**
 * @param request
 * @param response
 */
export async function getTaskListHandler(request: Request, response: Response) {
    const userId = get(request, "user._id");
    const tasks = await findTasks({user_id: userId});
    if (tasks.length === 0) return response.send({status: 'no data found!'});

    return response.send({'count': tasks.length, 'tasks': tasks});
}