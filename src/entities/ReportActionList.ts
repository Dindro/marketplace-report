import type ReportAction from '@/entities/ReportAction';
import type ProductId from '@/entities/ProductId';
import type { Maybe } from '@/types/common';
import type Product from '@/entities/Product';
import type { ReportActionId } from '@/entities/ReportAction';

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

    get returnCorrectList() {
        return this.filter(item => item.type === 'return-correct');
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

    get reversalReturnList() {
        return this.filter(item => item.type === 'reversal-return');
    }

    get finesList() {
        return this.filter(item => item.type === 'fines');
    }

    get commonFinesList() {
        return this.filter(item => item.type === 'common-fines');
    }

    get adList() {
        return this.filter(item => item.type === 'ad');
    }

    get storageList() {
        return this.filter(item => item.type === 'storage');
    }

    get underpaymentList() {
        return this.filter(item => item.type === 'underpayment');
    }

    get paidReceptionList() {
        return this.filter(item => item.type === 'paid-reception');
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

    get saleCommonCount(): number {
        return this.saleCount + this.marriageCount + this.lostProductCount + this.saleCorrectCount + this.reversalReturnCount;
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

    get returnCorrectCount(): number {
        return this.returnCorrectList.length;
    }

    get reversalReturnCount(): number {
        return this.reversalReturnList.length;
    }

    get finesCount(): number {
        return this.finesList.length;
    }

    get reversalCount(): number {
        return this.reversalList.length;
    }

    get adCount(): number {
        return this.adList.length;
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
        const reversalReturn = this.reversalReturnList.reduce((sum, item) => sum + item.buyerPaid, 0);

        const returnSale = this.returnList.reduce((sum, item) => sum + item.buyerPaid, 0);
        const returnCorrectSale = this.returnCorrectList.reduce((sum, item) => sum + item.buyerPaid, 0);
        const reversalSale = this.reversalList.reduce((sum, item) => sum + item.buyerPaid, 0);

        return sale + saleCorrect + saleMarriage + saleLostProduct + reversalReturn - returnSale - reversalSale - returnCorrectSale;
    }

    /** Перечисления за товары */
    get transferredForProducts(): number {
        return this.salePrice + this.saleCorrectPrice + this.marriagePrice + this.lostProductPrice + this.reveralReturnPrice - this.returnPrice - this.reversalPrice - this.returnCorrectPrice;
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

    /** Сумма сторно возвратов (продажа), Копейки */
    get reveralReturnPrice(): number {
        return this.reversalReturnList.reduce((sum, item) => sum + item.transferredPrice, 0);
    }

    /** Корректный возврат, Копейки */
    get returnCorrectPrice(): number {
        return this.returnCorrectList.reduce((sum, item) => sum + item.transferredPrice, 0);
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

    /** Сумма рекламы */
    get adPrice(): number {
        return this.adList.reduce((sum, item) => sum + item.buyerPaid, 0);
    }

    /** Стомость хранения */
    get storagePrice(): number {
        return this.storageList.reduce((sum, item) => sum + item.buyerPaid, 0);
    }

    /** Сумма недоплаты */
    get underpaymentPrice(): number {
        return this.underpaymentList.reduce((sum, item) => sum + item.buyerPaid, 0);
    }

    get paidReceptionPrice(): number {
        return this.paidReceptionList.reduce((sum, item) => sum + item.buyerPaid, 0);
    }

    /** Штрафы, Копейки */ 
    get finesPrice(): number {
        return this.finesList.reduce((sum, item) => sum + item.fines, 0);
    }

    /** Описание штрафов */
    get finesDescription(): string[] {
        return this.finesList.filter((item) => item.comment).map((item) => item.comment);
    }

    /** Общие штрафы */
    get commonFinesPrice(): number {
        return this.commonFinesList.reduce((sum, item) => sum + item.fines, 0);
    }

    /** Прочие удержания */
    get totalReceptionPrice(): number {
        return this.commonFinesPrice + this.adPrice;
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
        return this.salePrice + this.marriagePrice + this.lostProductPrice + this.saleCorrectPrice + this.reveralReturnPrice - this.deliveryPrice - this.deliveryReturnPrice - this.returnPrice - this.finesPrice - this.reversalPrice - this.returnCorrectPrice - this.adPrice - this.storagePrice - this.underpaymentPrice - this.commonFinesPrice - this.paidReceptionPrice;
    }
    
    /** Доход (Сумму которую перечислили) с вычетом налога */
    get revenuePriceWithoutTax(): number {
        return this.revenuePrice - this.tax;
    }

    /** Получить уникальный список id продукта */
    get uniqueProductIdList(): ProductId[] {
        const result: ProductId[] = [];

        const productIds = this.map(report => report.product.id);
        
        for (const productId of productIds) {
            const found = result.find(item => item.compare(productId));
            if (!found) result.push(productId);
        }

        return result;
    }

    get lastId(): ReportActionId {
        return Math.max(...this.map(report => report.id));
    }

    getListByProductId(productId: ProductId): ReportActionList {
        return this.filter(item => item.product.id.compare(productId)) as ReportActionList;
    }

    getProductByProductId(productId: ProductId): Maybe<Product> {
        const foundReportAction = this.find(item => item.product.id.compare(productId));
        if (foundReportAction) return foundReportAction.product;

        return null;
    }
}