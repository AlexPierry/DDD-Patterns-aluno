import { Sequelize } from "sequelize-typescript";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Unit test for product update use case", () => {
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

    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = ProductFactory.create("a", "Product 1", 10.0);
        await productRepository.create(product);

        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product name changed",
            price: 15.0
        }

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
})