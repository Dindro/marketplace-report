import ProductId from '@/entities/ProductId';
import type ProductPicture from './ProductPicture';
import type { Maybe } from '@/types/common';

export default class Product {
    code: number;

    name: string;

    category: string;

    article: string;

    brand: string;

    barcode: number;

    hatch: number;

    id: ProductId;

    picture: Maybe<ProductPicture>;

    constructor(code: number, name: string, category: string, article: string, brand: string, barcode: number, hatch: number, picture?: ProductPicture) {
        this.code = code;
        this.name = name;
        this.category = category;
        this.article = article;
        this.brand = brand;
        this.barcode = barcode;
        this.hatch = hatch;
        this.id = new ProductId(this.code, this.article, this.barcode, this.hatch);
        this.picture = picture || null;
    }
}