import express, {Request, Response, NextFunction} from "express";
import {requiresUser, validate} from "../middleware";
import {createTaskHandler, getTaskListHandler} from "../controller/task.controller";
import {createTaskSchema} from "../schema/task.schema";

const router = express.Router();

// Create task
router.post("/", [requiresUser, validate(createTaskSchema)], createTaskHandler);

// get all tasks
router.get("/", requiresUser, getTaskListHandler);

module.exports = router;


