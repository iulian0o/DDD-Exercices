import { logError } from "./logger.js";
function createEmail(s) {
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(s))
        throw new Error("Invalid email");
    return s;
}
function createPhone(s) {
    if (!/^\d[\d\-]{6,}$/.test(s))
        throw new Error("Invalid phone");
    return s;
}
function createCustomerName(s) {
    if (s.trim().length === 0)
        throw new Error("Name cannot be empty");
    return s.trim();
}
export function exercise3_StringConfusion() {
    // TypeScript sees all strings as the same!
    try {
        const customer = {
            name: createCustomerName("John Doe"),
            email: createEmail("john@example.com"),
            phone: createPhone("555-0000"),
        };
        logError(3, "Valid customer created with branded types", {
            customer,
            issue: "Now email, phone, and name have semantic distinction!",
        });
    }
    catch (error) {
        logError(3, "Error creating valid customer", {
            error: error instanceof Error ? error.message : String(error),
        });
    }
    // TODO: Create separate branded types (Email, Phone, CustomerName) so
    // that swapping values between fields becomes a compile-time error.
    // Even worse - empty strings pass validation
    try {
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
    catch (error) {
        logError(3, "Empty strings rejected by validation", {
            error: error instanceof Error ? error.message : String(error),
            issue: "Validation prevents empty required fields!",
        });
    }
}
