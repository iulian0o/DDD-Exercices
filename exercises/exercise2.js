import { logError } from "./logger.js";
function createQuantity(n) {
    if (!Number.isInteger(n))
        throw new Error("Quantity must be positive");
    if (n <= 0)
        throw new Error("Quantity must be positive");
    if (n > 100)
        throw new Error("Quantity exceeds maximum per order");
    return n;
}
export function exercise2_PrimitiveQuantity() {
    const order = {
        itemName: "Pizza",
        quantity: createQuantity(3), // Silent bug! Negative quantity
        pricePerUnit: 15,
    };
    // TODO: Replace `number` with a Quantity branded type.
    // Both of the bugs below should become impossible:
    //   quantity: -3       // <-- negative
    //   quantity: 50000    // <-- exceeds business limit
    const total = order.quantity * order.pricePerUnit;
    logError(2, "Negative quantity allowed - restaurant owes customer money?", {
        order,
        calculatedTotal: total,
        issue: "Quantity should be a positive integer!",
    });
    // Another silent bug - absurd quantity
    const bulkOrder = {
        itemName: "Coffee",
        quantity: createQuantity(50), // Silent bug! Unrealistic quantity
        pricePerUnit: 3,
    };
    logError(2, "Absurd quantity accepted without validation", {
        order: bulkOrder,
        calculatedTotal: bulkOrder.quantity * bulkOrder.pricePerUnit,
        issue: "Should we really accept an order for 50,000 coffees?",
    });
}
