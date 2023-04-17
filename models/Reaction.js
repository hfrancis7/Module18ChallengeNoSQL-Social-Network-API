const { Schema, model, ObjectId } = require('mongoose');
const reactionSchema = require('./Reaction');
var validate = require('mongoose-validator');

var thoughtValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 280],
      message: 'Thought should be between 1 and 280 characters'
    }),
  ];

const reactionSchema = new Schema(
    {
        readtionId: {
            type: ObjectId,
            default: new ObjectId(),
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
            //use getter method to format the timestamp on query
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;