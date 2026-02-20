import { logError } from "./logger.js";
function createPrice(amount) {
    if (amount < 0)
        throw new Error("Price can't be negative");
    if (amount > 10_000)
        throw new Error("Price exceeds maximum");
    return amount;
}
export function exercise1_PrimitivePrice() {
    const orderItem = {
        name: "Burger",
        price: createPrice(50), // Silent bug! Negative price
        quantity: 1,
    };
    // TODO: Replace `number` with a Price branded type.
    // The goal is to make this line a compile-time error:
    //   price: -50   // <-- should NOT be assignable to Price
    // Instead, force callers through createPrice(-50), which throws at runtime.
    const total = orderItem.price * orderItem.quantity;
    logError(1, "Negative price accepted without complaint", {
        item: orderItem.name,
        price: orderItem.price,
        calculatedTotal: total,
        issue: "Price should never be negative!",
    });
}
