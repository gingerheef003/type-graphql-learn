import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    if (!user.confirmed) throw new Error("user email is not confirmed");

    ctx.req.session.userId = user.id;

    return user;
  }
}
