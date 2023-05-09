const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId:ID!): User
    }
    type User {
        _id: ID!
        username: String!
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    input BookInput {
        bookId: String!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }
`;

module.exports = typeDefs;