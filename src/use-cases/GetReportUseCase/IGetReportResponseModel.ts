import type Product from '@/entities/Product';
import type UserFractionPrice from '@/entities/UserFractionPrice';

export interface ISummaryReport {
    unkownCount: number;
    buyerPaid: number;
    transferredForProducts: number;
    sale: number;
    saleCount: number;
    withoutMovement: number;
    withoutMovementCount: number;
    marriage: number;
    marriageCount: number;
    partialMarriage: number;
    partialMarriageCount: number;
    paymentShippingCost: number;
    paymentShippingCostCount: number;
    returnPartialMarriage: number;
    returnPartialMarriageCount: number;
    saleCorrect: number;
    saleCorrectCount: number;
    lost: number;
    lostCount: number;
    delivery: number;
    deliveryCount: number;
    deliveryCorrect: number;
    deliveryCorrectCount: number;
    deliveryReturn: number;
    deliveryReturnCount: number;
    deliveryReversal: number;
    deliveryReversalCount: number;
    deliveryCommon: number;
    deliveryCommonCount: number;
    return: number;
    returnCount: number;
    returnCorrect: number;
    returnCorrectCount: number;
    returnMarriage: number;
    returnMarriageCount: number;
    returnLostProduct: number;
    returnLostProductCount: number;
    returnWithoutMovement: number;
    returnWithoutMovementCount: number;
    reversal: number;
    reversalCount: number;
    reversalReturn: number;
    reversalReturnCount: number;
    retention: number;
    retentionCount: number;
    storage: number;
    underpayment: number;
    paidReception: number;
    fines: number;
    finesCount: number;
    finesDescription: string[],
    retentionCommon: number;
    retentionTotal: number;
    tax: number;
    taxPercent: number;
    taxSource: number;
    revenue: number;
    revenueWithoutTax: number;
    compensationReplacement: number;
    compensationReplacementCount: number;
    returnCompensationReplacement: number;
    returnCompensationReplacementCount: number;
}

export interface IProductSummaryReport {
    product: Product;
    summary: ISummaryReport;
}

export interface IFractionSummaryReport {
    userFractions: UserFractionPrice[];
    summary: ISummaryReport;
    products: IProductSummaryReport[];
}

export interface IFractionSummaryPrice {
    name: string;
    price: number;
}

export default interface IUploadReportResponseModel {
    summary: ISummaryReport;
    fractions: IFractionSummaryReport[];
}