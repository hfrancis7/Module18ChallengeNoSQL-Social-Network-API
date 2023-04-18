const router = require('express').Router();
const Thought = require('../models')
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router
  .route('/:ThoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

///api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions/:friendId")
  .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionsId
router
    .route('/:thoughtId/reactions/:reactionsId')
    .delete(deleteReaction);

module.exports = router;