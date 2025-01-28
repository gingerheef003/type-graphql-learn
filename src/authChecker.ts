import { AuthChecker } from "type-graphql";
import { MyContext } from "./types/MyContext";

export const authChecker: AuthChecker<MyContext> = ({ context: { req } }) => {
  return !!req.session.userId;
};
