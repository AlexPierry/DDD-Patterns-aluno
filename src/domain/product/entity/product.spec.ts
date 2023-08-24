import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Product("", "name", 1);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let order = new Product("1", "", 1);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is negative", () => {
        expect(() => {
            let order = new Product("1", "name", -1);
        }).toThrowError("Price must be greater than zero");
    });

    it("should change name", () => {
        const product = new Product("1", "name 1", 10);
        product.changeName("name 2");
        expect(product.name).toBe("name 2");
    });

    it("should change price", () => {
        const product = new Product("1", "name 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });

    it("should throw error changing price to negative", () => {
        const product = new Product("1", "name 1", 100);
        expect(() => {
            product.changePrice(-1);
        }).toThrowError("Price must be greater than zero");
    });

});