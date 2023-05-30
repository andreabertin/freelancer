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
      url: 'nats://localhost:4222',
      queue: 'customers',
      /**
       * Use the "Identity" (de)serializers for observing messages for
       * nest-only deployment.
       */
      // serializer: new OutboundMessageIdentitySerializer(),
      // deserializer: new InboundResponseIdentityDeserializer(),

      /**
       * Use the "External" (de)serializers for transforming messages to/from
       * (only) an external responder
       */
      // serializer: new OutboundMessageExternalSerializer(),
      // deserializer: new InboundResponseExternalDeserializer(),
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

    await this.client.emit('customer.create', p);
    return p;
  }

  async findAll(): Promise<Customer[]> {
    return [];
  }
}
