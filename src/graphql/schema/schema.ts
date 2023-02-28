// const { gql } = require("apollo-server");
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Your schema will go here
  type User {
    id: ID!
    name: String!
    gender: genderEnum!
    phone: String!
    email: String!
    address: String!
    nationality: String
    dateOfBirth: String!
    educationBackground: String
    preferedModeOfContact: preferedModeOfContactEnum
  }

  enum genderEnum {
    male
    female
    others
  }
  enum preferedModeOfContactEnum {
    email
    phone
    none
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: userInput!): User
  }

  input userInput {
    name: String
    gender: genderEnum
    phone: String
    email: String
    address: String
    nationality: String
    dateOfBirth: String
    educationBackground: String
    preferedModeOfContact: preferedModeOfContactEnum
  }


`;

// module.exports = typeDefs;
export default typeDefs;
