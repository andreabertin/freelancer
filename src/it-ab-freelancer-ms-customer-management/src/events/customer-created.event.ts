import { IEvent } from "@nestjs/cqrs";
import { Customer } from "@models/customer.model";

export class CustomerCreatedEvent implements IEvent {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly companyName: string,
    public readonly vatCode: string,
    public readonly taxCode: string) {
  }

}
