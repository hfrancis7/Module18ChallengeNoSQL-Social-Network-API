const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getArrayOfNames, getThoughts, getReaction } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users and thoughts
  const users = [];

  // Loop through all names -- add users to the users array
  let arrayOfNames = getArrayOfNames();
  for (let i = 0; i < arrayOfNames.length; i++) {
    const username = arrayOfNames.pop(Math.floor(Math.random() * arrayOfNames.length))
    const email = `${username}@gmail.com`;
    const thoughts = [];
    const friends = [];

    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users).catch((err)=>{console.log(err)});

  // Add thoughts to thoughts array
  const messages = getThoughts();
  for (let i = 0; i < messages.length; i++) {
    // Get a random user
    let result = await User.aggregate([{ $sample: { size: 1 } }]);
    const user = result[0];
    // console.log(user);

    // Create thought fields values
    const thoughtText = messages[i];
    const username = user.username;

    // Create reaction fields values
    const reactions = [];
    let reactionUsername;
    const reactionAmt = Math.floor(Math.random() * 20) + 1;
    for(let i = 0; i < reactionAmt; i++){
      const reactionBody = getReaction();
      result = await User.aggregate([
        { $match: { _id: { $ne: user._id } } },
        { $sample: { size: 1 } },
      ]);
      reactionUsername = result[0];
      reactions.push(
        { reactionBody: reactionBody, username: reactionUsername.username },
      );
      // console.log(reactions);
    }
    
    // Insert new Thought
    const thought = {
      thoughtText,
      username,
      reactions,
    };
    const newThought = await Thought.collection
      .insertOne(thought)
      .catch((err) => {
        console.log(err);
      });
    // console.log(newThought.insertedId);

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          thoughts: [newThought.insertedId],
          friends: [reactionUsername._id],
        },
      },
      { new: true }
    );
    // console.log(updatedUser);
  }

  process.exit(0);
});