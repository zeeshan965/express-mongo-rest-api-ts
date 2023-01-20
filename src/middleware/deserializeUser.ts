import {get} from "lodash";
import {Request, Response, NextFunction} from "express";
import {decode} from "../utils/jwt.utils";
import {reIssueAccessToken} from "../service/session.service";
import {JwtPayload} from "jsonwebtoken";

export interface userAuthInfoRequest extends Request {
    user?: object | string | null | JwtPayload
}

const deserializeUser = async (request: userAuthInfoRequest, response: Response, next: NextFunction) => {
    const accessToken = get(request, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = request.header('x-refresh');
    if (!accessToken) return next();
    const {decoded, expired} = decode(accessToken);
    if (decoded) {
        if (typeof decoded === "object") {
            request.user = decoded;
        }
        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken);

        if (newAccessToken) {
            // Add the new access token to the response header
            response.setHeader("x-access-token", newAccessToken);
            const {decoded} = decode(newAccessToken);
            if (typeof decoded === 'object') {
                request.user = decoded;
            }
        }

        return next();
    }

    return next();
};

export default deserializeUser;