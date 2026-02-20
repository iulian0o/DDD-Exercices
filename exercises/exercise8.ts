import { logError } from "./logger.js";

//============================================================================
// EXERCISE 8: The Email Validation Gap
//
// ANTI-PATTERN: Using `string` for email. TypeScript's type system cannot
// distinguish "alice@example.com" from "not-an-email" -- they're both strings.
// Every invalid format silently passes through.
//
// DDD FIX: Apply the "Parse, Don't Validate" principle.
// Instead of validating a string and hoping callers remember to check,
// parse it into a domain type. Once you have an `Email`, it is guaranteed
// valid -- no further checking needed anywhere in the codebase.
//
// HINT:
//   type Email = string & { readonly __brand: unique symbol }
//
//   function parseEmail(raw: string): Email {
//       const trimmed = raw.trim()
//       if (trimmed.length === 0) throw new Error("Email cannot be empty")
//       // Basic structural check: local@domain.tld
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
//           throw new Error(`Invalid email format: "${raw}"`)
//       return trimmed.toLowerCase() as Email
//   }
//
// KEY INSIGHT - "Parse, Don't Validate":
//   - Validation checks a value and returns boolean -> caller can ignore it.
//   - Parsing converts raw input into a strong type or throws -> impossible
//     to have an invalid Email in the system.
//   - This is a core DDD principle: push validation to the boundary of
//     your system (user input, API responses) and work with guaranteed-valid
//     types everywhere else.
// ============================================================================

type Email = string & { readonly __brand: unique symbol };

function parseEmail(raw: string): Email {
  const trimmed = raw.trim();

  if (trimmed.length === 0) throw new Error("Email can't be empty");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
    throw new Error(`Invalid email format: "${raw}"`);

  return trimmed.toLowerCase() as Email;
}

export function exercise8_EmailValidation() {
  type Customer = {
    name: string;
    email: Email;
  };

  // TODO: Replace `string` with a branded Email type backed by parseEmail().
  // After this change, constructing a Customer with an invalid email will
  // throw at runtime, and the type system prevents passing raw strings
  // where an Email is expected.

  // Iulian: I couldn't check the errors so I implemented for each a try catch statement and pushing directly into the Array (cleaner code as well)
  const customers: Customer[] = [];

  try {
    customers.push({ name: "Alice", email: parseEmail("alice@example.com") });
  } catch (error) {
    logError(8, "Failed to add Alice", {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    customers.push({ name: "Bob", email: parseEmail("not-an-email") });
  } catch (error) {
    logError(8, "Invalid email rejected", {
      name: "Bob",
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    customers.push({
      name: "Charlie",
      email: parseEmail("charlie@@double.com"),
    });
  } catch (error) {
    logError(8, "Invalid email rejected", {
      name: "Charlie",
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    customers.push({ name: "Diana", email: parseEmail("@no-local-part.com") });
  } catch (error) {
    logError(8, "Invalid email rejected", {
      name: "Diana",
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    customers.push({ name: "Eve", email: parseEmail("eve@") });
  } catch (error) {
    logError(8, "Invalid email rejected", {
      name: "Eve",
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    customers.push({ name: "Frank", email: parseEmail(" ") });
  } catch (error) {
    logError(8, "Invalid email rejected", {
      name: "Frank",
      error: error instanceof Error ? error.message : String(error),
    });
  }

  logError(8, "Invalid emails accepted - no domain validation", {
    customers,
    issue: "Email is just a string - no validation of email format!",
  });
}
