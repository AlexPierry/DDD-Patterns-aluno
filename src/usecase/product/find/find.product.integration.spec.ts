import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository)

        const product = new Product("123", "Product 1", 10.0);

        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const expectedOutput = {
            id: "123",
            name: "Product 1",
            price: 10.0
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(expectedOutput)
    })
})