import {Request, Response} from "express";
import {findUser, validatePassword} from "../service/user.service";
import {createAccessToken, createSession, findSessions, updateSession, userSession} from "../service/session.service";
import {sign} from "../utils/jwt.utils";
import config from "config";
import {get} from "lodash";

/**
 * @param request
 * @param response
 */
export async function createUserSessionHandler(request: Request, response: Response) {
    //validate the email and password
    const user = await validatePassword(request.body);
    if (!user) return response.status(401).send({status: "error", message: "Invalid username or password"});

    //create session, access token and refresh token
    const session = await createSession(user._id, request.get("user-agent") || "");
    const accessToken = createAccessToken(<userSession>{user, session});
    const refreshToken = sign(session, {
        expiresIn: config.get("refreshTokenTtl"), // 1 year
    });

    return response.send({accessToken, refreshToken});
}

/**
 * @param request
 * @param response
 */
export async function invalidateUserSessionHandler(request: Request, response: Response) {
    const sessionId = get(request, "user.session");
    await updateSession({_id: sessionId}, {valid: false});
    return response.status(200).send({status: "success"});
}

/**
 * @param request
 * @param response
 */
export async function getUserSessionsHandler(request: Request, response: Response) {
    const userId = get(request, "user._id");
    const user = await findUser({_id: userId});
    //const sessions = await findSessions({user: userId, valid: true});

    return response.send(user);
}