// PREVIOUS KNOWLEDGE:
// 1. Running code in TypeScript with Node.js
// 2. Basic TypeScript types (number, string, boolean, etc.)
// 3. Functions and type annotations
// 4. Type safety and compile-time checks
// 5. Factory functions
/*  RESTAURANT DOMAIN   */
const calculatePrice = (price, quantity) => {
    return (price * quantity);
};
// CAREFUL ! This function is very flexible but also very error-prone. It accepts any numbers !
const makePrice = (value) => {
    if (value < 0)
        throw new Error("price can't be nevative");
    if (value > 1000)
        throw new Error("price seems suspiciously high for a pizza!");
    return value;
};
const makeQuantity = (value) => {
    if (value <= 0)
        throw new Error("Quantity must be positive");
    if (!Number.isInteger(value))
        throw new Error("Quantity must be a whole number");
    return value;
};
try {
    const price = makePrice(100);
    const quantity = makeQuantity(3);
    const total = calculatePrice(price, quantity);
    console.log(total);
}
catch (e) {
    console.log("Invalid order patrameters");
}
export {};
/*  manual tests
// user inputs price and quantity

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
/**********************/
// TODO:  1. create makePrice and makeQuantity functions that validate the inputs and return branded types instead of raw numbers.
// TODO:  2. update calculatePrice to accept only resutls from makePrice and makeQuantity, ensuring that invalid inputs are caught at compile time rather than runtime.
// TODO:  3. apply Branded Types to calculatePrice to prevent accidental misuse of the function with raw numbers, enhancing type safety in the restaurant domain.
// TODO: 4. add try-catch blocks around the calls to makePrice and makeQuantity to handle potential validation errors gracefully, ensuring that the application can respond appropriately to invalid inputs without crashing.
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
/*
/*
/*
/*
/* TYPES   */
/* TYPESCRIP THING  */
// // Define the Brand utility
// type Brand<K, T> = K & { __brand: T }
// // Domain-specific types
// type USD = Brand<number, "USD">
// type Quantity = Brand<number, "Quantity">
// /*    TYPES   */
// const calculatePrice = (price: USD, quantity: Quantity): USD => {
// 	return (price * quantity) as USD
// }
/* RESTAURANT DOMAIN  */
/*   user orders 3 pizzas for $10  */
// const total = calculatePrice(45651321, -3)
// const makePrice = (value: number): USD => {
// 	if (value < 0) throw new Error("Price cannot be negative")
// 	if (value > 1000)
// 		throw new Error("Price seems suspiciously high for a pizza!")
// 	return value as USD
// }
// const makeQuantity = (value: number): Quantity => {
// 	if (value <= 0) throw new Error("Quantity must be positive")
// 	if (!Number.isInteger(value))
// 		throw new Error("Quantity must be a whole number")
// 	return value as Quantity
// }
// try {
// 	// These validators ensure the numbers make sense before the function ever runs
// 	const pizzaPrice = makePrice(-10)
// 	const pizzaCount = makeQuantity(3)
// 	const total = calculatePrice(pizzaPrice, pizzaCount)
// 	console.log(`Total is $${total}`) // Total is $30
// try {
// 	const total = calculatePrice(456 as USD, 4856 as Quantity)
// 	console.log(total)
// } catch (e: unknown) {
// 	console.error(e instanceof Error ? e.message : "An unknown error occurred")
// }
