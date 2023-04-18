const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
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
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionsId
router
    .route('/:thoughtId/reactions/:reactionsId')
    .delete(removeReaction);

module.exports = router;