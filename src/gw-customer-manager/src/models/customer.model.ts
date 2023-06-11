import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field()
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  createdAt: Date;

  @Field()
  lastUpdatedAt: Date;

  @Field({ nullable: true })
  companyName: string;

  @Field({ nullable: true })
  vatCode: string;

  @Field({ nullable: true })
  taxCode: string;
}
