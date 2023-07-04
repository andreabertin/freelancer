import { IsNotEmpty, ValidateIf } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCustomerDto {
  @ValidateIf(o => !o.lastName && !o.firstName)
  @IsNotEmpty()
  @Field()
  companyName: string;

  @ValidateIf(o => !o.companyName)
  @IsNotEmpty()
  @Field()
  lastName: string;

  @ValidateIf(o => !o.companyName)
  @IsNotEmpty()
  @Field()
  firstName: string;

  @ValidateIf(o => o.taxCode)
  @IsNotEmpty()
  @Field()
  taxCode: string;

  @ValidateIf(o => o.vatCode)
  @IsNotEmpty()
  @Field()
  vatCode: string;

  @IsNotEmpty()
  @Field()
  countryCode: string;
}
