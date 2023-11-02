import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository-interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customerList = await this.customerRepository.findAll();

        return {
            customers: customerList.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    city: customer.address.city,
                    zip: customer.address.zipCode
                }
            }))
        }
    }
}