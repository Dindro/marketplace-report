import type Product from '@/entities/Product';

export type ReportActionId = number;
export type ReportActionType = 
    'delivery' |
    'delivery-correct' |
    'delivery-reversal' |
    'sale' |
    'sale-correct' |
    'without-movement' |
    'partial-marriage' |
    'partial-marriage-return' |
    'return-correct' |
    'delivery-return' |
    'delivery-reversal-unkown' |
    'delivery-fraction' |
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
    'storage-recalculate' |
    'underpayment' |
    'paid-reception' |
    'payment-shipping-cost' |
    'payment-shipping-cost/storage-operation' |
    'compensation-replacement' |
    'compensation-replacement-return' |
    'recalculation-paid-acceptance' |
    'acquiring-adjustment' |
    'voluntary-compensation' |
    'voluntary-compensation-return' |
    'compensation-damage' |
    'compensation-damage-return' |
    'sale-correctly' |
    'sale-correctly-return' |
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