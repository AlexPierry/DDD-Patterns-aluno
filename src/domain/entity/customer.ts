import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get isActive(): boolean {
        return this._active;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address {
        return this._address;
    }

    set address(address: Address) {
        this._address = address;
    }

    //the object content must be always valid.
    validate() {
        if (this._name.length == 0) {
            throw new Error("Name is required");
        }
        if (this._id.length == 0) {
            throw new Error("Id is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address == null) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}