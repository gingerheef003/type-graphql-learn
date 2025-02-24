import { buildSchema } from "type-graphql";
import { authChecker } from "../authChecker";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import { CreateProductResolver, CreateUserResolver } from "../modules/user/CreateUser";
import { AuthorBookResolver } from "../modules/author-book/AuthorBookResolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      LogoutResolver,
      CreateUserResolver,
      CreateProductResolver,
      AuthorBookResolver
    ],
    validate: true,
    authChecker,
  });
