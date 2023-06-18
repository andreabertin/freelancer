import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller({
  version: '1',
  path: 'customer'
})
export class CustomerController {

  constructor(
    @Inject('CUSTOMER_GATEWAY')
    private proxy: ClientProxy,
    private logger: Logger
  ) {
  }

  @Post('create')
  async create(@Body() command: any) {
    console.log(command)
    return this.proxy.send('customer.create', command);
  }

  @Post('find-many')
  async findMany(@Body() filter: any) {
    return this.proxy.send('customer.findMany', filter);
  }


}
