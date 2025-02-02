import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { PasswordMixin } from "../../shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordMixin(class{}) {
  @Field()
  @Length(1, 30)
  firstName!: string;

  @Field()
  @Length(1, 30)
  lastName!: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email!: string;
}
