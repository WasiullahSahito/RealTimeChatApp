import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message; // Changed