import ValidatorInterface from "../../@shared/validator/validator.interface";
import Address from "../entity/address";
import * as yup from "yup";

export default class AddressYupValidator implements ValidatorInterface<Address>{
    validate(entity: Address): void {
        try {
            yup.object().shape({
                street: yup.string().required("Street is required"),
                number: yup.number().min(0, "Number must be positive"),
                city: yup.string().required("City is required"),
                zipCode: yup.string().required("Zipcode is required")
            })
                .validateSync({
                    street: entity.street,
                    number: entity.number,
                    city: entity.city,
                    zipCode: entity.zipCode
                },
                    {
                        abortEarly: false
                    });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "address",
                    message: error
                })
            })
        }
    }
}