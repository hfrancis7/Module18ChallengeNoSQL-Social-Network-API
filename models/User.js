const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

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
        thoughts: [thoughtSchema],
        friends: [this]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Student = model('student', studentSchema);

module.exports = Student;
