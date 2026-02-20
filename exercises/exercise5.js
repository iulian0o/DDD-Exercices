import { logError } from "./logger.js";
function generateOrderId() {
    return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
export function exercise5_IdentityCrisis() {
    // TODO: Replace `string` with an OrderId branded type.
    // Use a factory function that enforces a consistent format.
    // Consider who is responsible for uniqueness (hint: Repository pattern).
    // What makes a valid order ID? Nothing enforced!
    const orders = [
        {
            orderId: generateOrderId(), // Silent bug! Empty ID
            customerName: "Alice",
            total: 25,
        },
        {
            orderId: generateOrderId(), // Is this valid?
            customerName: "Bob",
            total: 30,
        },
        {
            orderId: generateOrderId(), // Silent bug! Duplicate ID
            customerName: "Charlie",
            total: 15,
        },
        {
            orderId: generateOrderId(), // Silent bug! Inconsistent format
            customerName: "Diana",
            total: 20,
        },
    ];
    logError(5, "Order ID chaos - duplicates, empty, inconsistent formats", {
        orders,
        issue: "Order IDs have no enforced format or uniqueness!",
    });
}
