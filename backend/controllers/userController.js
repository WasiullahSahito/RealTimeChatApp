// backend/controllers/userController.js
import User from '../models/User.js';

/**
 * @desc    Get all users for starting a new chat
 * @route   GET /api/users
 * @access  Public (should be private in a real app)
 */
export const getAllUsers = async (req, res) => {
    try {
        // We only send back essential info, not sensitive data
        const users = await User.find({}, 'displayName image');
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
};

/**
 * @desc    Get a single user profile
 * @route   GET /api/users/:id
 * @access  Private
 */
// Example of another potential controller function
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-googleId'); // Exclude sensitive fields
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
};