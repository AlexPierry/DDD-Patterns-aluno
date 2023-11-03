import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {

        const existingProduct = await this.productRepository.find(input.id);

        existingProduct.changeName(input.name);
        existingProduct.changePrice(input.price);

        await this.productRepository.update(existingProduct);

        return {
            id: existingProduct.id,
            name: existingProduct.name,
            price: existingProduct.price
        }
    }
}