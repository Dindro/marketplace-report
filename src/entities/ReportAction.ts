import type Product from '@/entities/Product';

export type ReportActionId = number;
export type ReportActionType = 
    'delivery' |
    'delivery-reversal' |
    'sale' |
    'sale-correct' |
    'without-movement' |
    'partial-marriage' |
    'partial-marriage-return' |
    'return-correct' |
    'delivery-return' |
    'return' |
    'marriage' |
    'marriage-return' |
    'lost-product' |
    'lost-product-return' |
    'reversal' |
    'reversal-return' |
    'without-movement-return' |
    'fines' |
    'organization-fines' |
    'common-retention' |
    'retention' |
    'storage' |
    'underpayment' |
    'paid-reception' |
    'payment-shipping-cost' |
    'compensation-replacement' |
    'compensation-replacement-return' |
    'unkown';

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