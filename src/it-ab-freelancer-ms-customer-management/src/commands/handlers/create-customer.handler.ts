import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "../create-customer.command";
import { Customer } from "@models/customer.model";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {

  constructor(
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: CreateCustomerCommand): Promise<any> {
    const customer = this.publisher.mergeObjectContext(
      new Customer(
        null,
        command.firstName,
        command.lastName,
        command.companyName,
        command.vatCode,
        command.taxCode
      )
    );

    customer.created();
    customer.commit();
  }

}
