import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AggregateRoot } from "@nestjs/cqrs";
import { CustomerCreatedEvent } from "../events/customer-created.event";

export type CustomerMandatoryProperties = Readonly<{
  id: string
}>

export type CustomerOptionalProperties = Readonly<{
  firstName: string,
  lastName: string,
  companyName: string,
  vatCode: string,
  taxCode: string
}>

export type CustomerProperties =
  CustomerMandatoryProperties
  & CustomerOptionalProperties;

@Entity()
export class Customer extends AggregateRoot {

  constructor(properties: CustomerProperties) {
    super();
    Object.assign(this, properties);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({name: 'created_at'})
  createdAt: Date;

  @Column({name: 'updated_at'})
  updatedAt: Date;

  @Column()
  companyName: string;

  @Column()
  vatCode: string;

  @Column()
  taxCode: string;

  created() {
    this.apply(new CustomerCreatedEvent(
      this.id,
      this.firstName,
      this.lastName,
      this.companyName,
      this.vatCode,
      this.taxCode
    ));
  }
}
