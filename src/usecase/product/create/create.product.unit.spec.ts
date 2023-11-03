import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 20.0
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product use case", () => {
    it("Should create a product", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    });

    it("Should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(createProductUseCase.execute(input)).rejects.toThrow("Name is required");
    });
});