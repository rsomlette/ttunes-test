import { ValidationRegex } from './ValidationRegex';

function isValid(regexPattern: RegExp) {
  return (value: string) => regexPattern.test(value);
}

export function isNotEmpty(value: string): boolean {
  return value != null && value !== '';
}

export const isValidName = isValid(ValidationRegex.NAME_REGEX);
