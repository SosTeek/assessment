import "graphql-import-node";
import typeDefs from "./schema/schema";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers/resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
