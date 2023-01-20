import mongoose from "mongoose";
import {UserDocument} from "./user.model";

/**
 * SessionDocument Interface
 */
export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * SessionSchema
 */
const SessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        valid: { type: Boolean, default: true },
        userAgent: { type: String },
    },
    {timestamps: true}
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;