import { ValidationOptions } from "joi";
import { registerDecorator } from "class-validator";
import { IsAllowedCountryConstraint } from "./is-allowed-country.constraint";

export function IsAllowedCountry(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAllowedCountryConstraint,
    });
  };
}
