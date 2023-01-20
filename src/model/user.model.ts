import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

/**
 * UserDocument Interface
 */
export interface UserDocument extends mongoose.Document {
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date

    comparePassword(candidatePassword: string): Promise<boolean>
}

/**
 * UserSchema
 */
const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    {timestamps: true}
);

UserSchema.pre("save", async function (next: (err?: Error) => void) {
    let user = this as UserDocument;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    // Replace the password with the hash
    user.password = bcrypt.hashSync(user.password, salt);

    return next();

});

/**
 * Compare password for login
 * @param candidatePassword
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)

};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;