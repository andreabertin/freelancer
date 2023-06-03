import { FindCustomersQuery } from "../find-customers.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { Customer } from "@entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(FindCustomersQuery)
export class FindCustomersHandler implements IQueryHandler<FindCustomersQuery> {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>
  ) {
  }

  async execute(query: FindCustomersQuery) {
    return this.repository.find();
  }
}
