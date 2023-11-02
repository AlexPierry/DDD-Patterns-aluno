import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository-interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from "uuid";

export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const customerId = uuid()
        const customer = new Customer(customerId, input.name)
        const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city);
        customer.address = address;

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zipCode,
                city: customer.address.city
            }
        }
    }
}