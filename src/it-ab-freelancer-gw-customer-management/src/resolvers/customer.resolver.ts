import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from '@models/customer.model';
import { CustomerService } from '@services/customer.service';
import { Observable } from "rxjs";

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(): Promise<Observable<Customer[]>> {
    return this.customerService.findAll();
  }

  @Mutation(() => Customer)
  async createCustomer() {
    return this.customerService.create();
  }
}
