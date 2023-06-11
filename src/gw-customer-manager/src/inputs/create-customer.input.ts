import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCustomerInput {
  @Field({nullable: true})
  firstName: string;
  @Field({nullable: true})
  lastName: string;
  @Field({nullable: true})
  companyName: string;
  @Field({nullable: true})
  taxCode: string;
  @Field({nullable: true})
  vatCode: string;
  @Field()
  countryCode: string;
}
