const { ApolloServer, gql } = require("apollo-server");

// There are two types, query and mutation.
const typeDefs = gql`
  type Query {
    hello: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type Mutation {
    register: User
  }
`;

console.log("fucking bitches");
const resolvers = {
  Query: {
    hello: () => "HELLO PAUL",
  },

  Mutation: {
    register: () => ({
      id: 1,
      username: "Bobby Brown",
    }),
  },
};

// Now we have our type def and our resolvers we can create an instance of the servers

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));

// This will default to port 4000 s
