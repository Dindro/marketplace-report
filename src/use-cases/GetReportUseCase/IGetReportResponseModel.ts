import type Product from '@/entities/Product';
import type UserFractionPrice from '@/entities/UserFractionPrice';

export interface ISummaryReport {
    unkownCount: number;
    price: number;
    marriage: number;
    marriageCount: number;
    buyCorrect: number;
    buyCorrectCount: number;
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
    reversal: number;
    reversalCount: number;
    fines: number;
    finesCount: number;
    finesDescription: string[],
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