
export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _quantity: number;
    private _price: number;

    constructor(id: string, productId: string, name: string, quantity: number, price: number) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._quantity = quantity;
        this._price = price;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    get name(): string {
        return this._name;
    }

    get quantity(): number {
        return this._quantity;
    }

    get productId(): string {
        return this._productId;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    validate() {
        if (this._id.length == 0) {
            throw new Error("Id is required");
        }

        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }

        if (this._price < 0) {
            throw new Error("Price must be zero or greater");
        }
    }
}