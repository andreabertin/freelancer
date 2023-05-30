import { AggregateRoot } from "@nestjs/cqrs";
import { CustomerCreatedEvent } from "../events/customer-created.event";

export class Customer extends AggregateRoot {

  constructor(
    private id: string,
    private firstName: string,
    private lastName: string,
    private companyName: string,
    private vatCode: string,
    private taxCode: string
  ) {
    super();
  }

  created() {
    this.apply(new CustomerCreatedEvent(
      this.firstName,
      this.lastName,
      this.companyName,
      this.vatCode,
      this.taxCode
    ));
  }

}
