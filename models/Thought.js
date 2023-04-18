const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
var validate = require('mongoose-validator');

//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

var thoughtValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 280],
      message: 'Thought should be between 1 and 280 characters'
    }),
  ];

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            validate: thoughtValidator,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (date) => new Date(date).toLocaleString()
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;