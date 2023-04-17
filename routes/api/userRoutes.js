const router = require('express').Router();
const User = require('../models')
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

//TODO: api/users/:userId/friends/:friendId
//post to add new friend to users friend list
//delete to remove a friend from a user's friend list

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router
  .route('/:UserId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;