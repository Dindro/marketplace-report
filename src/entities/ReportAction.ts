import type Product from '@/entities/Product';

export type ReportActionId = number;
export type ReportActionType = 'delivery' | 'sale' | 'sale-correct' | 'delivery-return' | 'return' | 'marriage' | 'lost-product' | 'reversal' | 'fines' | 'ad' | 'storage' | 'unkown';

export default class ReportAction {
    id: ReportActionId;

    type: ReportActionType;

    product: Product;

    /** Покупатель оплатил, Копейки */
    buyerPaid: number;

    /** Перечисления продавцу, Копейки */
    transferredPrice: number;

    /** Доставка, Копейки */
    deliveryPrice: number;

    /** Комментарий */
    comment: string;
 
    /** Штрафы, Копейки */
    fines: number;

    constructor(
        id: ReportActionId,
        type: ReportActionType,
        buyerPaid: number,
        transferredPrice: number,
        deliveryPrice: number,
        fines: number,
        comment: string,
        product: Product,
    ) {
        this.id = id;
        this.type = type;
        this.buyerPaid = buyerPaid;
        this.transferredPrice = transferredPrice;
        this.deliveryPrice = deliveryPrice;
        this.comment = comment;
        this.fines = fines;
        this.product = product;
    }
}