import { Ctx, EventPattern, MessagePattern, NatsContext, Payload } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "@commands/create-customer.command";

interface CreateCustomerDto {
  taxCode: string;
  vatCode: string;
  companyName: string;
  lastName: string;
  firstName: string;
}

@Controller()
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @MessagePattern('customer.create')
  create(
    @Payload() customer: CreateCustomerDto,
    @Ctx() context: NatsContext) {
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
