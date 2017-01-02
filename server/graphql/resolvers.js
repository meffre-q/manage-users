const resolvers = models => ({
  Query: {
    getUserById(root, { id }) {
      return models.User.findById(id).then(res => res);
    },
    getUserByUsername(root, { username }) {
      return models.User.findOne({ username }).then(res => res);
    },
  },
  Mutation: {
    createUser(root, args) {
      const user = new models.User(args);
      return user.save().then(res => res);
    },
  },
});

module.exports = resolvers;
