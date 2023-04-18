const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const reactionSchema = new Schema(
    {
        readtionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: date => new Date(date).toLocaleString(),
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;