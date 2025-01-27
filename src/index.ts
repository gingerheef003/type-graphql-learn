import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema, Query, Resolver } from "type-graphql";
import express from "express";
import cors from 'cors';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
}

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });
  await apolloServer.start();

  const app = express();
  app.use('/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer),
  )

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

bootstrap();
