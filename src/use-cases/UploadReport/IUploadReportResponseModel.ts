import type Product from '@/entities/Product';

export interface IProductInfoResponse {
    product: Product;
    orderCount: number;
    price: number;
    delivery: number;
    return: number;
    fraction: number;
    stateTax: number;
    revenue: number;
}

export default interface IUploadReportResponseModel {
    price: number;
    delivery: number;
    return: number;
    stateTax: number;
    orderCount: number;
    revenue: number;
    productList: IProductInfoResponse[];
}