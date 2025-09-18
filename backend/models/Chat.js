import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isGroupChat: { type: Boolean, default: false },
    chatName: { type: String, trim: true },
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat; // Changed