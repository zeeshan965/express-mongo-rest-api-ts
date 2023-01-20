import {LeanDocument, FilterQuery, UpdateQuery} from "mongoose";
import config from "config";
import {UserDocument} from "../model/user.model";
import Session, {SessionDocument} from "../model/session.model";
import {decode, sign} from "../utils/jwt.utils";
import {get} from "lodash";
import {findUser} from "./user.service";

/**
 *
 */
export interface userSession {
    user: | Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>;
    session: | Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>;
}

/**
 * @param userId
 * @param userAgent
 */
export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({user: userId, userAgent});
    return session.toJSON();
}

/**
 * @param user
 * @param session
 */
export function createAccessToken({user, session}: userSession) {
    // Build and return the new access token
    return sign(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")} // 15 minutes
    );
}

/**
 * @param refreshToken
 */
export async function reIssueAccessToken(refreshToken: string) {
    const {decoded} = decode(refreshToken);
    if (!decoded || !get(decoded, "_id")) return false;

    const session = await Session.findById(get(decoded, "_id"));
    if (!session || !session?.valid) return false;

    const user = await findUser({_id: session.user});
    if (!user) return false;

    return createAccessToken({user, session});
}

/**
 * @param query
 * @param update
 */
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return Session.updateOne(query, update);
}

/**
 * @param query
 */
export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).sort({_id: -1}).limit(1).lean();
}