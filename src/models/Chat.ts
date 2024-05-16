import mongoose, { Document, Schema } from "mongoose";

interface ChatDocument extends Document {
    name: string;
    participants: Array<Schema.Types.ObjectId>;
    hidden: boolean;
    type: 'private' | 'group';
    messages: Array<Schema.Types.ObjectId>;
}

const chatSchema = new Schema<ChatDocument>({
    name: {
        type: String,
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    hidden: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        enum: ['private', 'group'],
        default: 'private',
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, { timestamps: true });

const Chat = mongoose.model<ChatDocument>('Chat', chatSchema);

export default Chat;