import type ReportAction from '@/entities/ReportAction';
import type ProductId from '@/entities/ProductId';
import type { Maybe } from '@/types/common';
import type Product from '@/entities/Product';

export default class ReportActionList extends Array<ReportAction> {
    taxPercent: number;

    constructor(taxPercent: number = 0, ...items: ReportAction[]) {
        super(...items);

        this.taxPercent = taxPercent;
    }
    
    get saleList() {
        return this.filter(item => item.type === 'sale');
    }

    get saleCorrectList() {
        return this.filter(item => item.type === 'sale-correct');
    }

    get deliveryList() {
        return this.filter(item => item.type === 'delivery');
    }

    get deliveryReturnList() {
        return this.filter(item => item.type === 'delivery-return');
    }

    get returnList() {
        return this.filter(item => item.type === 'return');
    }

    get marriageList() {
        return this.filter(item => item.type === 'marriage');
    }

    get lostProductList() {
        return this.filter(item => item.type === 'lost-product');
    }

    get reversalList() {
        return this.filter(item => item.type === 'reversal');
    }

    get finesList() {
        return this.filter(item => item.type === 'fines');
    }

    get unkownList() {
        return this.filter(item => item.type === 'unkown');
    }

    get saleCount(): number {
        return this.saleList.length;
    }

    get marriageCount(): number {
        return this.marriageList.length;
    }

    get lostProductCount(): number {
        return this.lostProductList.length;
    }

    get saleCorrectCount(): number {
        return this.saleCorrectList.length;
    }

    get deliveryCount(): number {
        return this.deliveryList.length;
    }

    get deliveryReturnCount(): number {
        return this.deliveryReturnList.length;
    }

    get deliveryCommonCount(): number {
        return this.deliveryCount + this.deliveryReturnCount;
    }

    get returnCount(): number {
        return this.returnList.length;
    }

    get finesCount(): number {
        return this.finesList.length;
    }

    get reversalCount(): number {
        return this.reversalList.length;
    }

    get unkownCount(): number {
        return this.unkownList.length;
    }

    /** Покупатель заплатил (Продажа в отчетах) */
    get buyerPaid(): number {
        const sale = this.saleList.reduce((sum, item) => sum + item.buyerPaid, 0);
        const saleCorrect = this.saleCorrectList.reduce((sum, item) => sum + item.buyerPaid, 0);
        const saleMarriage = this.marriageList.reduce((sum, item) => sum + item.buyerPaid, 0);
        const saleLostProduct = this.lostProductList.reduce((sum, item) => sum + item.buyerPaid, 0);

        const returnSale = this.returnList.reduce((sum, item) => sum + item.buyerPaid, 0);
        const reversalSale = this.reversalList.reduce((sum, item) => sum + item.buyerPaid, 0);

        return sale + saleCorrect + saleMarriage + saleLostProduct - returnSale - reversalSale;
    }

    /** Перечисления за товары */
    get transferredForProducts(): number {
        return this.salePrice + this.saleCorrectPrice + this.marriagePrice + this.lostProductPrice - this.returnPrice - this.reversalPrice;
    }

    get salePrice(): number {
        return this.saleList.reduce((sum, item) => sum + item.transferredPrice, 0);
    }

    /** Корректная продажа */
    get saleCorrectPrice(): number {
        return this.saleCorrectList.reduce((sum, item) => sum + item.transferredPrice, 0);
    }

    get deliveryPrice(): number {
        return this.deliveryList.reduce((sum, item) => sum + item.deliveryPrice, 0);
    }

    get deliveryReturnPrice(): number {
        return this.deliveryReturnList.reduce((sum, item) => sum + item.deliveryPrice, 0);
    }

    /** Общая сумма логистики, Копейки */
    get deliveryCommonPrice(): number {
        return this.deliveryPrice + this.deliveryReturnPrice;
    }

    get returnPrice(): number {
        return this.returnList.reduce((sum, item) => sum + item.transferredPrice, 0);
    }

    /** Оплата брака, Копейки */
    get marriagePrice(): number {
        return this.marriageList.reduce((sum, item) => sum + item.transferredPrice, 0);
    }

    /** Оплата за потерянный товар, Копейки */
    get lostProductPrice(): number {
        return this.lostProductList.reduce((sum, item) => sum + item.transferredPrice, 0);
    }

    /** Сумма сторно продаж, Копейки */
    get reversalPrice(): number {
        return this.reversalList.reduce((sum, item) => sum + item.transferredPrice, 0);
    }

    /** Штрафы, Копейки */ 
    get finesPrice(): number {
        return this.finesList.reduce((sum, item) => sum + item.fines, 0);
    }

    /** Описание штрафов */
    get finesDescription(): string[] {
        return this.finesList.filter((item) => item.comment).map((item) => item.comment);
    }

    get taxSource(): number {
        return this.buyerPaid;
    }

    /** Государственный налог, Копейки */
    get tax(): number {
        return this.taxSource / 100 * this.taxPercent;
    }

    /** Доход (Сумму которую перечислили), Копейки */
    get revenuePrice(): number {
        return this.salePrice + this.marriagePrice + this.lostProductPrice + this.saleCorrectPrice - this.deliveryPrice - this.deliveryReturnPrice - this.returnPrice - this.finesPrice - this.reversalPrice;
    }
    
    /** Доход (Сумму которую перечислили) с вычетом налога */
    get revenuePriceWithoutTax(): number {
        return this.revenuePrice - this.tax;
    }

    getListByProductId(productId: ProductId): ReportActionList {
        return this.filter(item => item.product.id.compare(productId)) as ReportActionList;
    }

    getProductByProductId(productId: ProductId): Maybe<Product> {
        const foundReportAction = this.find(item => item.product.id.compare(productId));
        if (foundReportAction) {
            return foundReportAction.product;
        }

        return null;
    }
}