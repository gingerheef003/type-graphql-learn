import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { AppDataSource } from "../data-source";
import session from "express-session";
import { RedisStore } from "connect-redis";
import dotenv from "dotenv";
import { redis } from "./redis";
import { createSchema } from "./utils/createSchema";
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from "graphql-query-complexity";
import { MyContext } from "./types/MyContext";
import { createAuthorsLoader } from "./utils/authorsLoader";

dotenv.config();
if (!process.env.SESSION_SECRET) {
  throw new Error("Environment variables not set");
}

const SESSION_SECRET = process.env.SESSION_SECRET;
const MAX_COMPLEXITY = 8;

const bootstrap = async () => {
  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      {
        requestDidStart: async() => ({
          async didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,
              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({defaultComplexity: 1})
              ]
            })

            if (complexity > MAX_COMPLEXITY) {
              throw new Error(`Sorry, too complicated query! ${complexity} exceeded the maximum allowed complexity of ${MAX_COMPLEXITY}`)
            }

            console.log("Used query complexity points:", complexity);
          }
        })
      }
    ],
  });
  await apolloServer.start();

  const app = express();

  let redisStore = new RedisStore({
    client: redis,
  });

  app.use(
    session({
      store: redisStore,
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }: any) => ({ req, res, authorsLoader: createAuthorsLoader() }),
    })
  );

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
    bootstrap();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
