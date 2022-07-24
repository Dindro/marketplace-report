import type ReportAction from "@/entities/ReportAction";

export type DetailReportAction = {
    id: number;
    productBarcode: number;
    productName: string;
    productCategory: string;
    productArticle: string;

    /** Количество доставок */
    deliveryCount: number;
    /** Сумма доставка до покупателя, ₽ */
    deliveryPrice: number;
    /** Количество возвратов */
    returnCount: number;
    /** Перечисления продавцу за реализованный товар, ₽ */
    transferredToSellerForSaleGoods: number;
}

export interface IReportDetailRepository {
    getList(): Promise<ReportAction[]>;
}