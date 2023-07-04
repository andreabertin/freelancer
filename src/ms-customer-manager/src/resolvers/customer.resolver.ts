import { Customer } from "@entities/customer.entity";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "@commands/create-customer.command";
import { FindCustomersQuery } from "@queries/find-customers.query";
import { CreateCustomerDto } from "@dtos/create-customer.dto";
import { GraphQLString } from "graphql/type";

@Resolver(of => Customer)
export class CustomersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Mutation(r => Customer)
  async addCustomer(
    @Args('command', {type: () => CreateCustomerDto})
      customer: CreateCustomerDto) {
    return this.commandBus.execute(
      new CreateCustomerCommand(
        customer.firstName,
        customer.lastName,
        customer.companyName,
        customer.vatCode,
        customer.taxCode,
        customer.countryCode
      )
    );
  }

  @Query(r => Customer)
  async findCustomerById(@Args('id', {type: () => GraphQLString}) id: string) {
    return this.queryBus.execute(
      new FindCustomersQuery()
    );
  }
}
