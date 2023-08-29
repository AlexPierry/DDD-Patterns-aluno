import Address from "../entity/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("Should create a customer", () => {
        let customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    })

    it("Should create a customer with an address", () => {
        const address = new Address("Street name", 1, "12312312", "São Paulo");

        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });
});