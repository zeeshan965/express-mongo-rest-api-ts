import {Express, Request, Response} from "express";
import {createUserSchema, createUserSessionSchema} from "../schema/user.schema";
import {createTaskSchema} from "../schema/task.schema";
import {createUserHandler} from "../controller/user.controller";
import {createTaskHandler, getTaskListHandler} from "../controller/task.controller";
import {requiresUser, validate} from "../middleware";
import {
    createUserSessionHandler,
    getUserSessionsHandler,
    invalidateUserSessionHandler
} from "../controller/session.controller";

/**
 * @param app
 */
export default function (app: Express) {
    app.get("/healthCheck", (req: Request, res: Response) => res.sendStatus(200));

    app.all("/api", (req: Request, res: Response) => res.status(200).send({status: "success"}));

    //Register
    app.post("/register", validate(createUserSchema), createUserHandler);

    //Login
    app.post("/login", validate(createUserSessionSchema), createUserSessionHandler);

    // Get the user session
    app.get("/user", requiresUser, getUserSessionsHandler);

    //Logout
    app.delete("/logout", requiresUser, invalidateUserSessionHandler);

    // Create task
    app.post("/create-task", [requiresUser, validate(createTaskSchema)], createTaskHandler);

    // get all tasks
    app.get("/list-tasks", requiresUser, getTaskListHandler);
}