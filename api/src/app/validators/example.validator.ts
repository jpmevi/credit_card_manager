import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateExampleDto } from '../dtos/example.dto';

// VALIDATORS CONSTRAINT
@ValidatorConstraint({ async: true })
export class ActivationDateConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const status = args.object[0];
    if (status === 'ACTIVE') {
      return value ? true : false;
    }
    return true;
  }
  defaultMessage() {
    return 'The date is required when status is ACTIVE';
  }
}

// DECORATORS
export function ActivationDate(
  status: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: CreateExampleDto, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [status],
      validator: ActivationDateConstraint,
    });
  };
}
