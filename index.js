const { ApolloServer, gql } = require("apollo-server");

// There are two types, query and mutation.
const typeDefs = gql`
  type Query {
    hello(name: String): String!
    user: User
  }

  type User {
    id: ID!
    username: String!
    firstLetterOfUsername: String
  }
  type Error {
    field: String!
    message: String!
  }

  type RegisterResponse {
    errors: [Error]
    user: User
  }

  input UserInfo {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    register(userInfo: UserInfo): RegisterResponse!
    login(userInfo: UserInfo): String!
    # // username: (parent) => {
    # //   console.log(parent);
    # //   return parent.username;
    # // },
  }
`;

const resolvers = {

  User: {
    firstLetterOfUsername: (parent) => {
      return parent.username ? parent.username[0] : null;
    },
  },
  Query: {
    hello: (parent, { name }) => {
      return `Hey ${name}`;
    },
    user: () => ({
      id: 1,
      username: "Wobby Brown",
    }),
  },

  Mutation: {
    login: async (parent, { userInfo: { username } }, context, info) => {
      // Here we could check the password.
      // We could await the repsonse. await checkPassword(password)

      return username;
    },
    register: () => ({
      errors: [
        {
          field: "username",
          message: "BADDD",
        },
        {
          field: "password",
          message: "sucks",
        },
      ],
      user: {
        id: 1,
        username: "Nobby Brown",
      },
    }),
  },
};

// Now we have our type def and our resolvers we can create an instance of the servers

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));

// This will default to port 4000 s
