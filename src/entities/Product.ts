export type ProductId = number;

export default class Product {
    id: ProductId;

    name: string;

    category: string;

    article: string;

    brand: string;

    barcode: number;

    constructor(id: ProductId, name: string, category: string, article: string, brand: string, barcode: number) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.article = article;
        this.brand = brand;
        this.barcode = barcode;
    }
}