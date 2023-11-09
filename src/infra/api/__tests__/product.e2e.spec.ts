import { app, sequelize } from '../express';
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10.0
            })

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
    });

    it("Should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1"
            })

        expect(response.status).toBe(500);
    });

    it("Should list products", async () => {
        const response1 = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10.0
            })

        expect(response1.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 15.0
            })

        expect(response2.status).toBe(200);

        const responseList = await request(app).get("/product").send();

        expect(responseList.body.products.length).toEqual(2);
        const product1 = responseList.body.products[0];
        expect(product1.name).toEqual("Product 1");
        expect(product1.price).toEqual(10.0);

        const product2 = responseList.body.products[1];
        expect(product2.name).toEqual("Product 2");
        expect(product2.price).toEqual(15.0);
    })
});