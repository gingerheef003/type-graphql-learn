import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../constants/redixPrefixes";
import bcrypt from "bcryptjs";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) return null;

    const user = await User.findOne({ where: { id: parseInt(userId) } });
    if (!user) return null;

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    ctx.req.session.userId = user.id;

    await redis.del(forgotPasswordPrefix + token);

    return user;
  }
}
