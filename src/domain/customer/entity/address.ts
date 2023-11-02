export default class Address {
    private _street: string;
    private _number: number;
    private _zipCode: string;
    private _city: string;

    constructor(street: string, number: number, zipCode: string, city: string) {
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
        if (this._street.length == 0) {
            throw new Error("Street is required");
        }

        if (this._city.length == 0) {
            throw new Error("City is required");
        }

        if (this._number < 0) {
            throw new Error("Number must be positive");
        }

        if (this._zipCode.length == 0) {
            throw new Error("Zipcode is required");
        }
    }
}