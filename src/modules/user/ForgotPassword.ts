import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redixPrefixes";

@Resolver(User)
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<Boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return true; // to not let them know that user with that email is not found

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "EX", 60*60*24);

    await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

    return true;
  }
}
