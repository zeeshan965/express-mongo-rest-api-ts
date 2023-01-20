import {DocumentDefinition, FilterQuery} from "mongoose";
import User, {UserDocument} from "../model/user.model";
import {omit} from "lodash";

/**
 *
 */
interface validatePassword {
    email: UserDocument["email"]
    password: string
}

/**
 * @param input
 */
export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (error) {
        if (error.code == 11000) {
            throw new Error(JSON.stringify({
                status: "error",
                message: `Duplicate email: ${error.keyValue?.email}, Please choose another!`,
                code: error.code
            }));
        }
        throw new Error(error);
    }
}

/**
 * @param email
 * @param password
 */
export async function validatePassword({email, password}: validatePassword) {
    const user = await User.findOne({email});
    if (!user) return false;
    if (!await user.comparePassword(password)) return false;

    return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

export async function getUserDetails(query: FilterQuery<UserDocument>) {
    return User.findOne(query, '-password').lean();
}