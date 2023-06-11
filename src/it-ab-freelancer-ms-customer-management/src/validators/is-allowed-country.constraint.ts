import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { isAllowedCountryCode } from "@entities/customer.entity";

@ValidatorConstraint({ async: true })
export class IsAllowedCountryConstraint implements ValidatorConstraintInterface {
  validate(countryCode: any, args: ValidationArguments) {
    return  isAllowedCountryCode(countryCode);
  }
}
