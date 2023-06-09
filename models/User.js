const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

//TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;
