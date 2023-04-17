const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
var validate = require('mongoose-validator');

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

const Thought = model('thought', thoughtSchema);

module.exports = Thought;