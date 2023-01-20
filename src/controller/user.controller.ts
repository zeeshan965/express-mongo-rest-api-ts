import {Request, Response} from "express";
import {createUser} from "../service/user.service";
import {omit} from "lodash";
import logger from "../logger";

export async function createUserHandler(request: Request, response: Response) {
    try {
        const user = await createUser(request.body);
        return response.send(omit(user.toJSON(), "password"));
    } catch (e) {
        logger.error(e);
        if (typeof JSON.parse(e.message) !== "object") {
            return response.status(409).send(e.message);
        }
        return response.status(409).send(JSON.parse(e.message));
    }
}