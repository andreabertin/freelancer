import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateCustomerCommand } from "../create-customer.command";
import { Customer, CustomerProperties } from "@entities//customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {

  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: CreateCustomerCommand): Promise<any> {
    const customerProperties : CustomerProperties = {
      ...command,
      id: null
    };

    const customer = this.publisher.mergeObjectContext(
      this.repository.create(customerProperties)
    );

    await this.repository.insert(customer);

    customer.created();
    customer.commit();

    return customer;
  }

}
