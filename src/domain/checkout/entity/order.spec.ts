import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("Customer id is required");
    });

    it("should throw error when there is no item", () => {
        expect(() => {
            let order = new Order("1", "123", []);
        }).toThrowError("Items must be greater than zero");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "1", "item1", 2, 50);
        const item2 = new OrderItem("2", "2", "item2", 1, 100);

        const order = new Order("1", "123", [item1, item2]);

        expect(order.total()).toBe(200);
    });

    it("should throw error if quantity is not greater than zero", () => {
        expect(() => {
            const item1 = new OrderItem("1", "1", "item1", 0, 50);
        }).toThrowError("Quantity must be greater than zero");
    });
});