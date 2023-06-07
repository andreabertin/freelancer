import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CustomerCreatedEvent } from "../customer-created.event";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "@entities/customer.entity";
import { Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CustomerCreatedIntegrationEvent } from "@integration-events/customer-created.integrationevent";

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedHandler implements IEventHandler<CustomerCreatedEvent> {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @Inject('BROADCASTER')
    private client: ClientProxy
  ) {
  }

  async handle(event: CustomerCreatedEvent): Promise<any> {
    const customer = await this.customerRepository.findOneBy({id: event.id})
    if (customer) {
      const ie: CustomerCreatedIntegrationEvent = customer;
      this.client.emit('customer.created', {customer: ie});
    }
  }

}
