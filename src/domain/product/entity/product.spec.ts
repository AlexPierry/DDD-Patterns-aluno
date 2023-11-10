import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "name", 1);
        }).toThrowError("product: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 1);
        }).toThrowError("product: Name is required");
    });

    it("should throw error when price is negative", () => {
        expect(() => {
            let product = new Product("1", "name", -1);
        }).toThrowError("product: Price must be greater than zero");
    });

    it("should throw multiple errors", () => {
        expect(() => {
            let product = new Product("", "", -1);
        }).toThrowError("product: Id is required,product: Name is required,product: Price must be greater than zero");

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