import { Arg, ClassType, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";
import { Middleware } from "type-graphql/build/typings/typings/middleware";
import { Product } from "../../entities/Product";

function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[],
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: any) {
      return await entity.create({ ...data }).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name!: string;
}

export const CreateUserResolver = createBaseResolver("User", User, RegisterInput, User);
export const CreateProductResolver = createBaseResolver("Product", Product, ProductInput, Product);
