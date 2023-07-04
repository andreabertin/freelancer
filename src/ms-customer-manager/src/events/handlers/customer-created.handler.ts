import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CustomerCreatedEvent } from "../customer-created.event";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "@entities/customer.entity";
import { Repository } from "typeorm";
import { ClientProxy } from "@nestjs/microservices";
// import { CustomerCreatedIntegrationEvent, EVENT_NAME } from "@integration-events/customer-created.integrationevent";
import { InjectBroadcaster } from "@decorators/broadcaster.decorator";

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedHandler implements IEventHandler<CustomerCreatedEvent> {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectBroadcaster()
    private client: ClientProxy
  ) {
  }

  async handle(event: CustomerCreatedEvent): Promise<any> {
    const customer = await this.customerRepository.findOneBy({id: event.id})
    if (customer) {
      // const ie: CustomerCreatedIntegrationEvent = customer;
      // this.client.emit(EVENT_NAME, {customer: ie});
    }
  }

}
