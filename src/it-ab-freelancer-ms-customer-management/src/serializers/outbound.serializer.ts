import { OutgoingResponse, Serializer } from "@nestjs/microservices";

export class OutboundResponseIdentitySerializer implements Serializer {

  serialize(value: any): OutgoingResponse {
    console.debug(
      `-->> Serializing outbound response: \n${JSON.stringify(value)}`
    );
    return value;
  }
}
