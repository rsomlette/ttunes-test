interface IRules {
  handler: (value: string) => boolean;
  message: string;
}

interface IValidation {
  isValid: boolean;
  message: string;
}

export function validate(rules: IRules[], text?: string): IValidation {
  const returnValue: IValidation = {
    isValid: true,
    message: ''
  };

  let i = 0;
  do {
    const rule = rules[i];
    if (text == null || !rule.handler(text || '')) {
      returnValue.isValid = false;
      returnValue.message = rule.message;
      i = rules.length;
    }
    i++;
  } while (i < rules.length);

  return returnValue;
}
