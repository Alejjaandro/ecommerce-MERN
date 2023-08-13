import mongoose from 'mongoose';

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const UserSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            required: true,
        },

        lastname: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        
        password: {
            type: String,
            required: true,
        },

        isAdmin: {
            type: Boolean,
            default: false
        }
    },

    {timestamps: true}
);

export default mongoose.model('User', UserSchema);