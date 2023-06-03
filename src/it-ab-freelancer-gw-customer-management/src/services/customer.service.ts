import { Customer } from '@models/customer.model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Observable } from "rxjs";

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
      firstName: '',
      lastName: '',
      lastUpdatedAt: undefined,
      taxCode: '',
      vatCode: '',
      id: 'xxxx',
    };

    return this.customerMsClient.send('customer.create', p);
  }

  async findAll(): Promise<Observable<Customer[]>> {
    return this.customerMsClient.send('customer.find', {});
  }
}
