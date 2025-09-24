import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    // --- ADD THIS ---
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'audio'],
        default: 'text',
    },
    // --- END ADD ---
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;