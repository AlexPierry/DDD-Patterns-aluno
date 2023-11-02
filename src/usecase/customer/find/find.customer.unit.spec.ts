import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street 1", 123, "Zipcode", "City 1");
customer.address = address;

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "123"
        }

        const expectedOutput = {
            id: "123",
            name: "John",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 123,
                zip: "Zipcode"
            }
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(expectedOutput)
    });

    it("Should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        });

        const usecase = new FindCustomerUseCase(customerRepository)

        const input = {
            id: "123"
        }

        expect(() => { return usecase.execute(input) }).rejects.toThrow("Customer not found")
    })
})