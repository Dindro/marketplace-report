import type ProductPicture from '@/entities/ProductPicture';
import type IProductPictureRepository from '@/use-cases/IProductPictureRepository';

export default class GetProductPicture {
    private readonly productPictureRepository: IProductPictureRepository;

    constructor(productPictureRepository: IProductPictureRepository) {
        this.productPictureRepository = productPictureRepository;
    }

    execute(code: number): Promise<ProductPicture> {
        return this.productPictureRepository.get(code);
    }
}