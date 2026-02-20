import { logError } from "./logger.js";
function createHour(h) {
    if (!Number.isInteger(h) || h < 0 || h > 23)
        throw new Error("Hour must be 0-23");
    return h;
}
class OperatingHours {
    opens;
    closes;
    constructor(opens, closes) {
        this.opens = opens;
        this.closes = closes;
    }
    static create(opens, closes) {
        return new OperatingHours(createHour(opens), createHour(closes));
    }
    isOpenAt(hour) {
        if (this.opens <= this.closes) {
            return hour >= this.opens && hour < this.closes;
        }
        return hour >= this.opens || hour < this.closes;
    }
}
export function exercise6_TemporalLogic() {
    const restaurant = {
        name: "Joe's Diner",
        opensAt: createHour(22), // Opens at 10 PM
        closesAt: createHour(6), // Closes at 6 AM - crosses midnight!
    };
    // Simple check fails for overnight restaurants
    const isOpen = (hour) => {
        return hour >= restaurant.opensAt && hour <= restaurant.closesAt;
    };
    // TODO: Replace the raw numbers with an OperatingHours Value Object.
    // Move the isOpen logic INSIDE the Value Object so it correctly handles
    // overnight spans and rejects invalid hours at construction time.
    logError(6, "Operating hours logic broken for overnight restaurants", {
        restaurant,
        testHour: 2, // 2 AM should be open
        isOpenCalculated: isOpen(2), // Returns false incorrectly
        issue: "Simple comparison fails when hours cross midnight!",
    });
    // Also accepts invalid hours
    try {
        const brokenRestaurant = {
            name: "Broken Cafe",
            opensAt: createHour(25), // Silent bug! Invalid hour
            closesAt: createHour(-5), // Silent bug! Invalid hour
        };
        logError(6, "Invalid hours accepted without validation", {
            restaurant: brokenRestaurant,
            issue: "Hours should be 0-23 only!",
        });
    }
    catch (error) {
        logError(6, "Invalid hours rejected", {
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
