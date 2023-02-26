import ProductId from '@/entities/ProductId';

export default class Product {
    code: number;

    name: string;

    category: string;

    article: string;

    brand: string;

    barcode: number;

    hatch: number;

    id: ProductId;

    constructor(code: number, name: string, category: string, article: string, brand: string, barcode: number, hatch: number) {
        this.code = code;
        this.name = name;
        this.category = category;
        this.article = article;
        this.brand = brand;
        this.barcode = barcode;
        this.hatch = hatch;
        this.id = new ProductId(this.code, this.article, this.barcode, this.hatch);
    }
}