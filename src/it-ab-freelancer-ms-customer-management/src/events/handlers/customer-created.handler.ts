import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CustomerCreatedEvent } from "../customer-created.event";
import { Repository } from "typeorm";
import { Customer } from "@entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedHandler implements IEventHandler<CustomerCreatedEvent> {

  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>
  ) {
  }


  async handle(event: CustomerCreatedEvent): Promise<any> {
    const entity: Customer = {
      id: null,
      firstName: event.firstName,
      lastName: event.lastName,
      companyName: event.companyName,
      vatCode: event.vatCode,
      taxCode: event.taxCode,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.repository.insert(entity);
  }

}
