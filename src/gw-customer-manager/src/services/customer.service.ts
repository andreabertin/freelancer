import { Customer } from '@models/customer.model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable, of } from "rxjs";
import { CreateCustomerInput } from "../inputs/create-customer.input";

@Injectable()
export class CustomerService {

  constructor(
    private logger: Logger,
    @Inject('CUSTOMER_MS') private customerMsClient: ClientProxy) {
  }

  async create(command: CreateCustomerInput) {
    return this.customerMsClient
      .send('customer.create', {
        firstName: command.firstName,
        lastName: command.lastName,
        companyName: command.companyName,
        taxCode: command.taxCode,
        vatCode: command.vatCode,
        countryCode: command.countryCode
      })
      .pipe(
        catchError((err, o) => {
          this.logger.error(err)
          return of({error: err})
        })
      );
  }

  async findAll(): Promise<Observable<Customer[]>> {
    return this.customerMsClient.send('customer.find', {});
  }
}
