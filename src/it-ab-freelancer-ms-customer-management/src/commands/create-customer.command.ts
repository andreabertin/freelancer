export class CreateCustomerCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly companyName: string,
    public readonly vatCode: string,
    public readonly taxCode: string
  ) {
  }

}
