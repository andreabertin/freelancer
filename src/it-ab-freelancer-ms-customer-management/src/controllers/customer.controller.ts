import { Ctx, MessagePattern, NatsContext, Payload } from "@nestjs/microservices";
import { Controller, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "@commands/create-customer.command";
import { FindCustomersQuery } from "@queries/find-customers.query";
import { IsNotEmpty, ValidateIf } from "class-validator";
import { AllExceptionsFilter } from "@filters/exception.filter";

export class CreateCustomerDto {
  taxCode: string;
  vatCode: string;

  @ValidateIf(o => !o.lastName && !o.firstName)
  @IsNotEmpty({
    context: {

    }
  })
  companyName: string;

  @ValidateIf(o => !o.companyName)
  @IsNotEmpty()
  lastName: string;

  @ValidateIf(o => !o.companyName)
  @IsNotEmpty()
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
  @UsePipes(new ValidationPipe())
  @UseFilters(new AllExceptionsFilter())
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

  @MessagePattern('customer.find')
  find(
    @Payload() customer: CreateCustomerDto,
    @Ctx() context: NatsContext) {
    return this.queryBus.execute(
      new FindCustomersQuery()
    );
  }

}
