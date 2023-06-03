import { Customer } from '@models/customer.model';
import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from "@nestjs/microservices";

@Injectable()
export class CustomerService {

  constructor(private logger: Logger) {
  }

  @Client({
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222'
    },
  })
  client: ClientProxy;

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

    // return this.client.send('customer.create', p);

    return this.client.send('customer.create', p);
  }

  async findAll(): Promise<Customer[]> {
    return [];
  }
}
