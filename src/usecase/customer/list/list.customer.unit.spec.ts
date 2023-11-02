import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = new Customer("1", "Customer 1");
const address1 = new Address("Street 1", 1, "Zip 1", "City 1");
customer1.address = address1;

const customer2 = new Customer("2", "Customer 2");
const address2 = new Address("Street 2", 2, "Zip 2", "City 2");
customer2.address = address2;

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit test for listing customer use case", () => {

    it("Should list customers", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);

    });
});
