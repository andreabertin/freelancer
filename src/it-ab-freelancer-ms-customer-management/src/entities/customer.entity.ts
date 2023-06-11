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
  taxCode: string,
  countryCode: string,
}>

export type CustomerProperties =
  CustomerMandatoryProperties
  & CustomerOptionalProperties;

export const ALLOWED_COUNTRY_CODES = ["IT"];

export function isAllowedCountryCode(cc: string) {
  return !!ALLOWED_COUNTRY_CODES.find(acc => acc == cc);
}

@Entity()
export class Customer extends AggregateRoot {

  constructor(properties: CustomerProperties) {
    super();
    Object.assign(this, properties);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({nullable: true})
  companyName: string;

  @Column({nullable: true})
  vatCode: string;

  @Column({nullable: true})
  taxCode: string;

  @Column({nullable: true})
  countryCode: string;

  created() {
    this.apply(new CustomerCreatedEvent(this.id));
  }
}
