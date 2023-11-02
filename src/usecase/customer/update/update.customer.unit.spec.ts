import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street 1", 123, "Zipcode", "City 1");
customer.address = address;

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        city: "City Updated",
        zip: "Zip Updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for customer update use case", () => {

    it("Should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
})