import { logError } from "./logger.js";
function createEmail(s) {
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(s))
        throw new Error("Invalid email");
    return s;
}
function createPhone(s) {
    if (!/^\d[d\-]{6,}$/.test(s))
        throw new Error("Invalid phone number");
    return s;
}
function createCustomerName(s) {
    if (s.trim().length === 0)
        throw new Error("Name can't be empty");
    return s;
}
export function exercise3_StringConfusion() {
    // TypeScript sees all strings as the same!
    const customer = {
        name: createCustomerName("John Doe"), // Silent bug! Email in name field
        email: createEmail("john@example.com"), // Silent bug! Name in email field
        phone: createPhone("555-PIZZA"), // Silent bug! Letters in phone field
    };
    // TODO: Create separate branded types (Email, Phone, CustomerName) so
    // that swapping values between fields becomes a compile-time error.
    logError(3, "Fields mixed up - all are strings, TypeScript doesn't care", {
        customer,
        issue: "Email, phone, and name are all 'string' - no semantic distinction!",
    });
    // Even worse - empty strings pass validation
    const emptyCustomer = {
        name: createCustomerName(""),
        email: createEmail(""),
        phone: createPhone(""),
    };
    logError(3, "Empty strings accepted everywhere", {
        customer: emptyCustomer,
        issue: "Required fields should not be empty!",
    });
}
