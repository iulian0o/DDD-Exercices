import { logError } from "./logger.js";
function parseEmail(raw) {
    const trimmed = raw.trim();
    if (trimmed.length === 0)
        throw new Error("Email can't be empty");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
        throw new Error(`Invalid email format: "${raw}"`);
    return trimmed.toLowerCase();
}
export function exercise8_EmailValidation() {
    // TODO: Replace `string` with a branded Email type backed by parseEmail().
    // After this change, constructing a Customer with an invalid email will
    // throw at runtime, and the type system prevents passing raw strings
    // where an Email is expected.
    // Iulian: I couldn't check the errors so I implemented for each a try catch statement and pushing directly into the Array (cleaner code as well)
    const customers = [];
    try {
        customers.push({ name: "Alice", email: parseEmail("alice@example.com") });
    }
    catch (error) {
        logError(8, "Failed to add Alice", {
            error: error instanceof Error ? error.message : String(error),
        });
    }
    try {
        customers.push({ name: "Bob", email: parseEmail("not-an-email") });
    }
    catch (error) {
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
    }
    catch (error) {
        logError(8, "Invalid email rejected", {
            name: "Charlie",
            error: error instanceof Error ? error.message : String(error),
        });
    }
    try {
        customers.push({ name: "Diana", email: parseEmail("@no-local-part.com") });
    }
    catch (error) {
        logError(8, "Invalid email rejected", {
            name: "Diana",
            error: error instanceof Error ? error.message : String(error),
        });
    }
    try {
        customers.push({ name: "Eve", email: parseEmail("eve@") });
    }
    catch (error) {
        logError(8, "Invalid email rejected", {
            name: "Eve",
            error: error instanceof Error ? error.message : String(error),
        });
    }
    try {
        customers.push({ name: "Frank", email: parseEmail(" ") });
    }
    catch (error) {
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
