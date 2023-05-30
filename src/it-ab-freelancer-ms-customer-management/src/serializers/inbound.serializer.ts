import { ConsumerDeserializer, IncomingRequest } from "@nestjs/microservices";

export class InboundMessageIdentityDeserializer
  implements ConsumerDeserializer {

  deserialize(value: any, options?: Record<string, any>): IncomingRequest {
    console.debug(
      `<<-- deserializing inbound message:\n${JSON.stringify(
        value
      )}\n\twith options: ${JSON.stringify(options)}`
    );
    return value;
  }
}
