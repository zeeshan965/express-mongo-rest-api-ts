import {get} from "lodash";
import {Request, Response, NextFunction} from "express";

const requiresUser = async (request: Request, response: Response, next: NextFunction) => {
    const user = get(request, "user");
    if (!user) return response.status(403).send({status: "Unauthenticated!"});
    return next();
};

export default requiresUser;