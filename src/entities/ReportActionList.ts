import type ReportAction from '@/entities/ReportAction';
import type { ProductId } from '@/entities/Product';

export default class ReportActionList extends Array<ReportAction> {
    stateTaxPercent: number;

    constructor(taxPercent: number = 0, ...items: ReportAction[]) {
        super(...items);

        this.stateTaxPercent = taxPercent;
    }
    
    get buyList() {
        return this.filter(item => item.type === 'buy');
    }

    get deliveryList() {
        return this.filter(item => item.type === 'delivery');
    }

    get returnList() {
        return this.filter(item => item.type === 'return');
    }

    get orderCount() {
        return this.buyList.length;
    }

    get price(): number {
        return this.buyList.reduce((sum, item) => sum + item.transferredToSellerPrice, 0);
    }

    get deliveryPrice(): number {
        return this.deliveryList.reduce((sum, item) => sum + item.deliveryPrice, 0);
    }

    get returnPrice(): number {
        return this.returnList.reduce((sum, item) => sum + item.deliveryPrice, 0);
    }

    /** Государственный налог, ₽ */
    get stateTax(): number {
        return this.price / 100 * this.stateTaxPercent;
    }

    /** Чистая прибыль + Выручка, ₽ */
    get revenuePriceWithouteStateTax(): number {
        return this.price - this.returnPrice - this.deliveryPrice;
    }
    
    /** Чистая прибыль + Выручка - Налог, ₽ */
    get revenuePrice(): number {
        return this.revenuePriceWithouteStateTax - this.stateTax;
    }

    getListByProductId(productId: ProductId): ReportActionList {
        return this.filter(item => item.product.id === productId) as ReportActionList;
    }
}