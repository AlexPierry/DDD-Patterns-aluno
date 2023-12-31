import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    })

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street 1",
                    city: "City 1",
                    number: 123,
                    zip: "Zip 1"
                }
            })

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John")
        expect(response.body.address.street).toBe("Street 1")
        expect(response.body.address.city).toBe("City 1")
        expect(response.body.address.number).toBe(123)
        expect(response.body.address.zip).toBe("Zip 1")
    });

    it("Should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John"
            })

        expect(response.status).toBe(500);
    });

    it("Should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street 1",
                    city: "City 1",
                    number: 123,
                    zip: "Zip 1"
                }
            })

        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    city: "City 2",
                    number: 321,
                    zip: "Zip 2"
                }
            })

        expect(response2.status).toBe(200);

        const listReponse = await request(app).get("/customer").send();

        expect(listReponse.status).toBe(200);
        expect(listReponse.body.customers.length).toBe(2);
        const customer1 = listReponse.body.customers[0];
        expect(customer1.name).toBe("John");
        expect(customer1.address.street).toBe("Street 1");

        const customer2 = listReponse.body.customers[1];
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street 2");
    });
})