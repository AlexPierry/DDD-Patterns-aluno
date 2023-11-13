import Address from "./address";

describe("Address unit tests", () => {
    it("Should throw and error when the street is empty", () => {
        expect(() => {
            let address = new Address("", 1, "zip", "city")
        }).toThrowError("address: Street is required");
    });

    it("Should throw and error when the number is negative", () => {
        expect(() => {
            let address = new Address("street", -1, "zip", "city")
        }).toThrowError("address: Number must be positive");
    });

    it("Should throw and error when the zipcode is empty", () => {
        expect(() => {
            let address = new Address("street", 1, "", "city")
        }).toThrowError("address: Zipcode is required");
    })

    it("Should throw and error when the city is empty", () => {
        expect(() => {
            let address = new Address("", 1, "zip", "")
        }).toThrowError("address: City is required");
    })

    it("Should throw mutiple errors", () => {
        expect(() => {
            let address = new Address("", -1, "", "")
        }).toThrowError("address: Street is required,address: Number must be positive,address: City is required,address: Zipcode is required");
    })
});