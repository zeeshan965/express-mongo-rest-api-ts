import {AnySchema, ValidationError} from "yup";
import {Request, Response, NextFunction} from "express";
import log from "../logger";


const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (e: ValidationError | any) {
        log.error(e.errors);
        return res.status(400).send({status: "error", message: e.errors[e.errors.length - 1]});
    }
};

export default validate;