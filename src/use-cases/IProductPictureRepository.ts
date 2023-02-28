import type ProductPicture from '@/entities/ProductPicture';

export default interface IProductPictureRepository {
    get(code: number): Promise<ProductPicture>;
}