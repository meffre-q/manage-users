const schema = `
  type User {
    id: ID!
    username: String!
    description: String!
  }
  type Query {
    getUserById(id: ID!): User
    getUserByUsername(username: String!): Username
  }
  type Mutation {
      createUser(email: String!): User
    }
  schema {
    query: Query
  }
`;

module.exports = schema;
