import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    bio: { type: String, default: 'Hey there! I am using WebApp Chat.' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User; // Changed from module.exports