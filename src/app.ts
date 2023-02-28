import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';

dotenv.config();

const port = process.env.PORT || 2002;
const env = process.env.NODE_ENV || 'Development';

//initialize express app
const app = express();

// cors middleware
app.use(cors());

// Connect to the database.
const DB : string = process.env.DATABASE_LOCAL as string;
mongoose.connect(DB).then
  (() => console.log('DB Connected Successfully!'));

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
