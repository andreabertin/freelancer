import { IEvent } from "@nestjs/cqrs";

export class CustomerCreatedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly companyName: string,
    public readonly vatCode: string,
    public readonly taxCode: string) {
  }

}
