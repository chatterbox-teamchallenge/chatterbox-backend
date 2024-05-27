import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IPendingUser extends Document {
    username: string;
    email: string;
    password: string;
    confirmationToken: string;
}

const pendingUserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmationToken: { type: String, required: true }
});

pendingUserSchema.pre<IPendingUser>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const PendingUser = mongoose.model<IPendingUser>('PendingUser', pendingUserSchema);

export default PendingUser;