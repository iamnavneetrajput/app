// Import Mongoose
import { Schema, model } from 'mongoose';
import validator from 'validator';  // For additional email validation
import { Error } from 'mongoose';
import bcrypt from 'bcryptjs';
const { genSalt, hash, compare } = bcrypt;


// Define the schema for the User model
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v) => validator.isEmail(v),
                message: 'Email is invalid',
            },
            index: true, // Adding index for faster queries
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [20, 'Username must be at most 20 characters long'],
            match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            validate: {
                validator: (v) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v),
                message: 'Password must contain at least one letter, one number, and one special character',
            },
        },
        photo: {
            type: String, // Store URL or file reference
            default: null,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        subscriptionPlan: {
            type: String,
            enum: ['free', 'premium'],
            default: 'free',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await genSalt(10);
            this.password = await hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error); // Pass errors to the next middleware
    }
});

// Static method for user login
userSchema.statics.findByCredentials = async function (identifier, password) {
    try {
        const user = await this.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) {
            throw new Error('Invalid login credentials');
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid login credentials');
        }

        return user;
    } catch (error) {
        throw new Error('Login error: ' + error.message);
    }
};

// Method to toggle block status
userSchema.methods.toggleBlock = async function () {
    try {
        this.isBlocked = !this.isBlocked;
        await this.save();
        return this.isBlocked;
    } catch (error) {
        throw new Error('Error toggling block status: ' + error.message);
    }
};

// Custom error handling for validation errors
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'ValidationError') {
        next(new Error('Validation error: ' + error.message));
    } else {
        next(error);
    }
});

// Export the User model
const User = model('User', userSchema);

export default User;
