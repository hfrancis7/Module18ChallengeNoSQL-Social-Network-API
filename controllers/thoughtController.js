const { User, Thought, Reaction } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : reaction.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: 'Thought and reactions deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Add Reaction
  addReaction(req,res){
    User.findById(req.body,userId)
    .then((user) => {
      if(!user) {
        return res.status(404).json({message: "No user with this id!"});
      }

      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {new: true},
        {$push: { reactions: {
          reactionBody: req.body.reactionBody,
          username: user.username,
        },
      },},)
    },)
    .then((thought) =>{
      !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.status(201).json({message: 'Added new reaction', thought})
    })
    .catch((err) => {
      res.status(500).json({ message: "Reaction failed to add", error: err.message,});
    });
  }


  //Remove Reaction
};