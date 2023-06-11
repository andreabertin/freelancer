import { IEvent } from "@nestjs/cqrs";

export class CustomerCreatedEvent implements IEvent {
  constructor(public readonly id: string) {
  }

}
