import type Product from '@/entities/Product';

export type ReportActionId = number;
export type ReportActionType = 'delivery' | 'buy' | 'return';

export default class ReportAction {
    id: ReportActionId;

    type: ReportActionType;

    product: Product;

    /** Перечисления продавцу, Копейки */
    transferredToSellerPrice: number;

    /** Доставка, Копейки */
    deliveryPrice: number;
 
    /** Штрафы, Копейки */
    fines: number;

    constructor(
        id: ReportActionId,
        type: ReportActionType,
        transferredToSellerPrice: number,
        deliveryPrice: number,
        fines: number,
        product: Product,
    ) {
        this.id = id;
        this.type = type;
        this.transferredToSellerPrice = transferredToSellerPrice;
        this.product = product;
        this.deliveryPrice = deliveryPrice;
        this.fines = fines;
    }
}