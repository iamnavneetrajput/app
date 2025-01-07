import User from '../model/User.js';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    const { email, username, password, photo, role, subscriptionPlan } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already exists' });
        }

        // Create a new user
        const newUser = new User({
            email,
            username,
            password,
            photo,
            role,
            subscriptionPlan,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Find user by credentials (email or username)
        const user = await User.findByCredentials(identifier, password);

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: 'Invalid credentials', error: error.message });
    }
};

// Toggle user block status
export const toggleUserBlock = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedBlockStatus = await user.toggleBlock();

        res.status(200).json({
            message: `User ${updatedBlockStatus ? 'blocked' : 'unblocked'} successfully`,
            isBlocked: updatedBlockStatus,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling block status', error: error.message });
    }
};

// Update user's profile (e.g., photo, username, etc.)
export const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { username, photo, subscriptionPlan } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username || user.username;
        user.photo = photo || user.photo;
        user.subscriptionPlan = subscriptionPlan || user.subscriptionPlan;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};