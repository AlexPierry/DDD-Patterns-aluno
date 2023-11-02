import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository-interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {

        const existingCustomer = await this.customerRepository.find(input.id);

        existingCustomer.changeName(input.name);
        existingCustomer.address.street = input.address.street;
        existingCustomer.address.number = input.address.number;
        existingCustomer.address.city = input.address.city;
        existingCustomer.address.zipCode = input.address.zip;

        await this.customerRepository.update(existingCustomer);

        return {
            id: existingCustomer.id,
            name: existingCustomer.name,
            address: {
                street: existingCustomer.address.street,
                number: existingCustomer.address.number,
                city: existingCustomer.address.city,
                zip: existingCustomer.address.zipCode
            }
        }
    }
}