import express, {Request, Response, NextFunction} from "express";
import {createUserSchema, createUserSessionSchema} from "../schema/user.schema";
import {createUserHandler} from "../controller/user.controller";
import {requiresUser, validate} from "../middleware";
import {createUserSessionHandler, getUserSessionsHandler} from "../controller/session.controller";

const router = express.Router();

router.all('/', function (req: Request, res: Response, next: NextFunction) {
    res.status(200).send({message: 'welcome!'});
});

//API Check
router.get("/healthCheck", (req: Request, res: Response) => res.sendStatus(200));

//All method supported route
router.all("/jack", (req: Request, res: Response) => res.status(200).send({status: "success"}));

//Register
router.post("/register", validate(createUserSchema), createUserHandler);

//Login
router.post("/login", validate(createUserSessionSchema), createUserSessionHandler);

// Get the user session
router.get("/user", requiresUser, getUserSessionsHandler);

module.exports = router;
