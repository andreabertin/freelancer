import { Customer } from '@models/customer.model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { catchError, last, Observable, of } from "rxjs";

@Injectable()
export class CustomerService {

  constructor(
    private logger: Logger,
    @Inject('CUSTOMER_MS') private customerMsClient: ClientProxy) {
  }

  async create() {
    const p = {
      companyName: '',
      createdAt: undefined,
      firstName: 'yyy',
      lastName: 'xxx',
      lastUpdatedAt: undefined,
      taxCode: '',
      vatCode: '',
      id: 'xxxx',
    };


    return this.customerMsClient
      .send('customer.create', p)
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
