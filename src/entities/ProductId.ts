export default class ProductId {
    private code: number;

    private article: string;

    private barcode: number;

    private hatch: number;

    constructor(code: number, article: string, barcode: number, hatch: number) {
        this.code = code;
        this.article = article;
        this.barcode = barcode;
        this.hatch = hatch;
    }

    get isUnkown(): boolean {
        return this.code === 0 && this.article === '' && this.barcode === 0 && this.hatch === 0;
    }

    compare(productId: ProductId): boolean {
        return !!(
            (this.code && this.code === productId.code) ||
            (this.barcode && this.barcode === productId.barcode) || 
            (this.article && this.article === productId.article) ||
            (this.hatch && this.hatch === productId.hatch)
        );
    }

    better(productId: ProductId): boolean {
        return this.getLevel(this) >= this.getLevel(productId);
    }

    private getLevel(productId: ProductId) {
        return [productId.code, productId.barcode, productId.article, productId.hatch]
            .filter(property => property)
            .length;
    }

    toString(): string {
        return [this.code, this.barcode, this.article, this.hatch].join('_');
    }
}