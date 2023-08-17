import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model"
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {
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

    it("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipCode,
            city: address.city
        });
    });

    it("Should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            active: false,
            rewardPoints: 0,
            street: "Street 1",
            number: 1,
            zipcode: "Zipcode 1",
            city: "City 1"
        });

        customer.changeName("Customer 2");
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel2?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipCode,
            city: customer.address.city
        });
    });

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        const foundCustomer = await customerRepository.find("1");

        expect(customer).toStrictEqual(foundCustomer);
    });

    it("Should throw error if customer not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("12345");
        }).rejects.toThrow("Customer not found");
    });

    it("Should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Customer 1");
        customer.addRewardPoints(10);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;

        await customerRepository.create(customer);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer2.address = address2;
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);
    });
});