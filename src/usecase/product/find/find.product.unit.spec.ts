import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 15.0);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find product use case", () => {

    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "123"
        }

        const expectedOutput = {
            id: "123",
            name: "Product 1",
            price: 15.0
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(expectedOutput)
    });

    it("Should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        });

        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "123"
        }

        expect(() => { return usecase.execute(input) }).rejects.toThrow("Product not found")
    })
})