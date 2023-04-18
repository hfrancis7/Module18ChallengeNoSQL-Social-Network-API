const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router
  .route('/:UserId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

//api/users/:userId/friends/:friendId
//post to add new friend to users friend list
//delete to remove a friend from a user's friend list
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;