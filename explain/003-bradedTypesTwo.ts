/*  USER REGISTRATION   */

/*  USER REGISTRATION   */

type Brand<K, T> = K & {readonly __brand: T};

type Name = Brand<string, "Name">;
type Email = Brand<string, "Email">;
type Phone = Brand<string, "Phone">;
type Password = Brand<string, "Password">;

type User = {
	name: Name,
	email: Email,
	phone: Phone,
	password: Password,
};

const createUser = (
	name: Name,
	email: Email,
	phone: Phone,
	password: Password,
): User => {
	return {
		name,
		email,
		phone,
		password,
	}
};

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const makeName = (value: string): Name => {
  if (value === null || value === undefined) {
    throw new ValidationError("Name cannot be null or undefined");
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    throw new ValidationError("Name cannot be empty");
  }

  if (trimmed.length < 2 || trimmed.length > 50) {
    throw new ValidationError("Name must be between 2 and 50 characters");
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/
  if (!nameRegex.test(trimmed)) {
    throw new ValidationError('Name can only contain letters, spaces, hyphens, and apostrophes');
  }

  return trimmed as Name;
};

const makeEmail = (value: string): Email => {
  if (value === null || value === undefined) {
    throw new ValidationError("Email cannot be null or undefined");
  }

  const trimmed = value.trim().toLowerCase();

  if (trimmed.length === 0) {
    throw new ValidationError("Email cannot be empty");
  }

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if(!emailRegex.test(trimmed)) {
    throw new ValidationError("Email must be in valid format (user@domain.com)");
  }

  if (trimmed.length > 254) {
    throw new ValidationError("Email cannot exceed 254 characters");
  }

  return trimmed as Email;
};

const makePhone = (value: string): Phone => {
  if (value === null || value === undefined) {
    throw new ValidationError("Phone cannot be null or undefined");
  }

  const cleaned = value.replace(/[\s\-().]/g, '');

  if(!/^\d+$/.test(cleaned)) {
    throw new ValidationError('Phone must contain only digits')
  }

  if (cleaned.length !== 10) {
    throw new ValidationError('Phone must be exactly 10 digits')
  }

  const prefix = cleaned.substring(0, 2);
  const validPrefixes = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

  if(!validPrefixes.includes(prefix)) {
    throw new ValidationError('Phone must start with valid French prefix (01-09)');
  }

  const formatted = cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');

  return formatted as Phone;
};

const makePassword = (value: string): Password => {
  if (value === null || value === undefined) {
    throw new ValidationError("Password cannot be null or undefined");
  }

  if (value.length === 0) {
    throw new ValidationError("Password cannot be empty");
  }

  if (value.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }

  if (value.length > 128) {
    throw new ValidationError('Password cannot exceed 128 characters');
  }

  if (!/[a-zA-Z]/.test(value)) {
    throw new ValidationError('Password must contain at least one letter');
  }

  if (!/\d/.test(value)) {
    throw new ValidationError('Password must contain at least one number')
  }
  
  return value as Password;
};

const registerUser = (
	nameStr: string,
	emailStr: string,
	phoneStr: string,
	passwordStr: string
): User => {
	const name = makeName(nameStr)
	const email = makeEmail(emailStr)
	const phone = makePhone(phoneStr)
	const password = makePassword(passwordStr)

	return createUser(name, email, phone, password)
}

try {
	const newUser = registerUser(
		'Alice Johnson',
		'alice@example.com',
		'0612345678',
		'secret123'
	)
	console.table(newUser)
}
catch (error) {
	if (error instanceof ValidationError) {
		console.error('Validation Error:', error.message)
	}
}

/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/********/

// TODO: 1. Type checks
// TODO: 2. Validation checks (Factory Functions) return Phone Type with a simple string (weak validation)
// TODO: 3. try-catch blocks around the calls to createPhone to handle potential validation errors gracefully, ensuring that the application can respond appropriately to invalid inputs without crashing.
// TODO: 4. Branded Types to prevent accidental misuse of the createUser function with raw strings, enhancing type safety in the restaurant domain.

/*

-----   Factory Functions  -----
const makeName()
const makeEmail()
const makePhone()
const makePassword()

*/

// Validation Rules for createUser:
// - name: Must be a non-empty string, typically 2-50 characters, no special characters except spaces/hyphens
// - email: Must follow valid email format (local@domain.tld), cannot be empty
// - phone: Already validated by createPhone factory (French format: 10 digits, valid prefix)
// - socialSecurityNumber: Must follow a specific format (depends on country - length, structure, checksum)
//   * Could be validated as a Value Object similar to Phone
//   * Should not be stored as plain string in production (PII/security concern)
// - All fields: Should check for null/undefined
// - Business rule: User must have unique email (typically checked against database)

// Branded Types:
// - Name: string & { readonly __brand: unique symbol }
// - Email: string & { readonly __brand: unique symbol }
// - Phone: string & { readonly __brand: unique symbol }
// - Password: string & { readonly __brand: unique symbol }
// - SocialSecurityNumber: string & { readonly __brand: unique symbol }