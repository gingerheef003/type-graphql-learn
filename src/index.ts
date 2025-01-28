import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import express from "express";
import cors from "cors";
import { AppDataSource } from "../data-source";
import { RegisterResolver } from "./modules/user/Register";
import session from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import dotenv from "dotenv";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { authChecker } from "./authChecker";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

dotenv.config();
if (!process.env.SESSION_SECRET) {
  throw new Error("Environment variables not set");
}

const SESSION_SECRET = process.env.SESSION_SECRET;

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver, ConfirmUserResolver],
    validate: true,
    authChecker,
  });

  const apolloServer = new ApolloServer({
    schema,
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
      context: async ({ req }: any) => ({ req }),
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
