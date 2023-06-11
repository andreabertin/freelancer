import { Ctx, MessagePattern, NatsContext, Payload } from "@nestjs/microservices";
import { Controller, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "@commands/create-customer.command";
import { FindCustomersQuery } from "@queries/find-customers.query";
import { AllExceptionsFilter } from "@filters/exception.filter";
import { CreateCustomerDto } from "./dtos/create-customer.dto";

@Controller()
@UsePipes(new ValidationPipe())
@UseFilters(new AllExceptionsFilter())
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
        customer.taxCode,
        customer.countryCode
      )
    );
  }

  @MessagePattern('customer.find')
  find(
    @Payload() customer: CreateCustomerDto,
    @Ctx() context: NatsContext) {
    return this.queryBus.execute(
      new FindCustomersQuery()
    );
  }

}
