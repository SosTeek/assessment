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
