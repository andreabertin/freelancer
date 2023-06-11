import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from '@models/customer.model';
import { CustomerService } from '@services/customer.service';
import { Observable } from "rxjs";
import { CreateCustomerInput } from "../inputs/create-customer.input";

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {
  }

  @Query(() => [Customer])
  async customers(): Promise<Observable<Customer[]>> {
    return this.customerService.findAll();
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('command') command: CreateCustomerInput
  ) {
    return this.customerService.create(command);
  }
}
