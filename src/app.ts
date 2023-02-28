import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';

dotenv.config();

const port = process.env.PORT || 2002;
const env = process.env.NODE_ENV || 'Development';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://studio.apollographql.com'
];
const corsOptions = {
  credentials: true,
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}

//initialize express app
const app = express();

// cors middleware
app.use(cors(corsOptions));

// Connect to the database.
const DB : string = process.env.DATABASE_LOCAL as string;
mongoose.connect(DB).then
  (() => console.log('DB Connected Successfully!'));

// Start the server.
async function startApolloServer(schema: any) {
  const server = new ApolloServer({

    schema

import { ApolloServer } from 'apollo-server-express';

// import schema  from './graphql/schema'

// Define the interface for the Book type.
interface Book {
  title: string;
  author: string;
}

// Define the interface for the Query type.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;


const books: Book[] = [
  { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
];

// Provide resolver functions for schema fields
const resolvers = {
  Query: {
    books: () => books,
  },
};

dotenv.config();

const port = process.env.PORT || 2002;
const env = process.env.NODE_ENV || 'Development';

async function startApolloServer(schema: any, resolvers: any) {
  const app = express();
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  }) as any;
  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app, path: '/graphql' });
  await new Promise<void>((resolve) =>
    app.listen(port, () => {
      return console.log(`${env} server is listening at http://localhost:${port}/graphql`);
    }) // start the Express server.
  );
}
//in the end, run the server and pass in our Schema
startApolloServer(schema);
