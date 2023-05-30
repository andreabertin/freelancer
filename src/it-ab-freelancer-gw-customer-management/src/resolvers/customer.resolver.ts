import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from '@models/customer.model';
import { CustomerService } from '@services/customer.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  customers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Mutation(() => Customer)
  async createCustomer() {
    return this.customerService.create();
  }
}
