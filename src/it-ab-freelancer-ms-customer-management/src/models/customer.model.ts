// import { AggregateRoot } from "@nestjs/cqrs";
// import { CustomerCreatedEvent } from "../events/customer-created.event";
//
// export type CustomerMandatoryProperties = Readonly<{
//   id: string
// }>
//
// export type CustomerOptionalProperties = Readonly<{
//   firstName: string,
//   lastName: string,
//   companyName: string,
//   vatCode: string,
//   taxCode: string
// }>
//
// export type CustomerProperties =
//   CustomerMandatoryProperties
//   & CustomerOptionalProperties;
//
// export class Customer extends AggregateRoot {
//   private readonly id: string;
//   private firstName: string;
//   private lastName: string;
//   private companyName: string;
//   private vatCode: string;
//   private taxCode: string;
//
//   constructor(properties: CustomerProperties) {
//     super();
//     Object.assign(this, properties);
//   }
//
//   created() {
//     this.apply(new CustomerCreatedEvent(
//       this.id,
//       this.firstName,
//       this.lastName,
//       this.companyName,
//       this.vatCode,
//       this.taxCode
//     ));
//   }
//
// }
