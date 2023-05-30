import { Ctx, EventPattern, MessagePattern, NatsContext, Payload } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "@commands/create-customer.command";

@Controller()
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @EventPattern('customer.create')
  create(@Payload() customer: CreateCustomerCommand, @Ctx() context: NatsContext) {
    console.log('hellooooo', customer);
    return this.commandBus.execute(
      new CreateCustomerCommand(
        customer.firstName,
        customer.lastName,
        customer.companyName,
        customer.vatCode,
        customer.taxCode
      )
    );
  }

}
