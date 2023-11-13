import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import AddressValidatorFactory from "../factory/address.validator.factory";

export default class Address extends Entity {
    private _street: string;
    private _number: number;
    private _zipCode: string;
    private _city: string;

    constructor(street: string, number: number, zipCode: string, city: string) {
        super();
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._city = city;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get city(): string {
        return this._city;
    }

    set street(value: string) {
        this._street = value;
        this.validate();
    }

    set number(value: number) {
        this._number = value;
        this.validate();
    }

    set zipCode(value: string) {
        this._zipCode = value;
        this.validate();
    }

    set city(value: string) {
        this._city = value;
        this.validate();
    }

    validate() {
        AddressValidatorFactory.create().validate(this);

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors);
        }
    }
}