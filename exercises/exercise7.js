import { logError } from "./logger.js";
class Money {
    cents;
    currency;
    constructor(cents, // always stored in smallest unit
    currency) {
        this.cents = cents;
        this.currency = currency;
    }
    static fromDollars(amount, currency) {
        return new Money(Math.round(amount * 100), currency);
    }
    static fromCents(cents, currency) {
        if (!Number.isInteger(cents))
            throw new Error("Cents must be integer");
        return new Money(cents, currency);
    }
    add(other) {
        if (this.currency !== other.currency)
            throw new Error("Cannot add different currencies");
        return new Money(this.cents + other.cents, this.currency);
    }
    format() {
        return `$${(this.cents / 100).toFixed(2)}`;
    }
}
export function exercise7_CurrencyConfusion() {
    const burger = {
        name: "Burger",
        price: Money.fromDollars(12.5, 'USD'), // Is this $12.50 or 12.5 cents?
    };
    const pizza = {
        name: "Pizza",
        price: Money.fromCents(1850, "USD"), // Is this $18.50 or $1850?
    };
    // TODO: Replace `number` with a Money Value Object.
    // Force a single canonical representation (e.g., cents) so that
    // adding burger.price + pizza.price always means the same thing.
    // Calculations produce unexpected results
    const total = burger.price.add(pizza.price); // 12.5 + 1850 = 1862.5
    const formattedTotal = `$${total.format()}`; // $1862.50 ??
    logError(7, "Currency unit confusion leads to calculation errors", {
        items: [burger, pizza],
        calculatedTotal: formattedTotal,
        issue: "Are prices in dollars or cents? TypeScript doesn't know!",
    });
}
