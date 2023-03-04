import type Product from '@/entities/Product';
import type UserFractionPrice from '@/entities/UserFractionPrice';

export interface ISummaryReport {
    unkownCount: number;
    buyerPaid: number;
    transferredForProducts: number;
    sale: number;
    saleCount: number;
    marriage: number;
    marriageCount: number;
    saleCorrect: number;
    saleCorrectCount: number;
    lost: number;
    lostCount: number;
    delivery: number;
    deliveryCount: number;
    deliveryReturn: number;
    deliveryReturnCount: number;
    deliveryCommon: number;
    deliveryCommonCount: number;
    return: number;
    returnCount: number;
    returnCorrect: number;
    returnCorrectCount: number;
    reversal: number;
    reversalCount: number;
    reversalReturn: number;
    reversalReturnCount: number;
    ad: number;
    adCount: number;
    storage: number;
    underpayment: number;
    fines: number;
    finesCount: number;
    finesDescription: string[],
    finesCommon: number;
    tax: number;
    taxPercent: number;
    taxSource: number;
    revenue: number;
    revenueWithoutTax: number;
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