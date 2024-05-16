import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
    chats: Array<Schema.Types.ObjectId>;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
});

userSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;