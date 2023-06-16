import { IsNotEmpty, ValidateIf } from "class-validator";

export class CreateCustomerDto {
  @ValidateIf(o => !o.lastName && !o.firstName)
  @IsNotEmpty()
  companyName: string;

  @ValidateIf(o => !o.companyName)
  @IsNotEmpty()
  lastName: string;

  @ValidateIf(o => !o.companyName)
  @IsNotEmpty()
  firstName: string;

  @ValidateIf(o => o.taxCode)
  @IsNotEmpty()
  taxCode: string;

  @ValidateIf(o => o.vatCode)
  @IsNotEmpty()
  vatCode: string;

  @IsNotEmpty()
  countryCode: string;
}
