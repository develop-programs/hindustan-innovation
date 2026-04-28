export interface FormField {
  name: string;
  value: string;
  error?: string;
  touched: boolean;
}

export interface FormSchema {
  name: { label: string; placeholder: string; required?: boolean };
  email: { label: string; placeholder: string; required?: boolean };
  phone: { label: string; placeholder: string; required?: boolean };
  subject: { label: string; placeholder: string; required?: boolean };
  message: { label: string; placeholder: string; required?: boolean };
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
}

function validateField(value: string, rules: ValidationRules): string | undefined {
  if (rules.required && !value.trim()) {
    return "This field is required";
  }

  if (rules.minLength && value.trim().length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.trim().length > rules.maxLength) {
    return `Must be at most ${rules.maxLength} characters`;
  }

  if (rules.email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailPattern.test(value)) {
      return "Please enter a valid email address";
    }
  }

  if (rules.phone) {
    const phonePattern = /^[+]?[\d\s\-()]{10,}$/;
    if (value && !phonePattern.test(value.replace(/\s/g, ""))) {
      return "Please enter a valid phone number";
    }
  }

  if (rules.pattern && value && !rules.pattern.test(value)) {
    return "Invalid format";
  }

  return undefined;
}

function validateForm(
  data: Record<string, string>,
  schema: Record<string, ValidationRules>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const error = validateField(data[field], rules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

export const contactFormSchema: Record<string, ValidationRules> = {
  name: { required: true, minLength: 2 },
  email: { required: true, email: true },
  phone: {},
  subject: {},
  message: { required: true, minLength: 10 },
};

export { validateField, validateForm };