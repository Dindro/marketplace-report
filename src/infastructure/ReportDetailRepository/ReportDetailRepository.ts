import * as XLSX from 'xlsx';

import ReportAction from '@/entities/ReportAction';
import Product from '@/entities/Product';
import reportActionTypeMap from '@/infastructure/ReportDetailRepository/reportActionTypeMap';

import type { IReportDetailRepository } from '@/use-cases/IReportDetailRepository';
import type { ReportActionType } from '@/entities/ReportAction';
import type { ReportActionId } from '@/entities/ReportAction';

type TypeDocument = 'return' | 'sale' | 'unkown';
const typeDocumentMap: { [key: string]: TypeDocument } = {
    'продажа': 'sale',
    'возврат': 'return',
};

export default class ReportDetailRepository implements IReportDetailRepository {
    private report: ArrayBuffer;
    
    constructor(report: ArrayBuffer) {
        this.report = report;
    }

    getList(): Promise<ReportAction[]> {
        const workbook = XLSX.read(this.report, { type: 'binary' });
        const sheet = workbook.SheetNames[0];
        if (sheet) {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            const reportActionList = this.convertTableDataToActionList(data);
            return Promise.resolve(reportActionList);
        } else {
            throw new Error('Таблица пустая');
        }
    }

    private convertTableDataToActionList(data: any): ReportAction[] {
        let result: ReportAction[] = [];

        if (Array.isArray(data)) {
            let uniqueProductList: Product[] = [];

            for (const row of data) {
                const productCode: number = +row['Код номенклатуры'];
                const productName: string = row['Название'];
                const productCategory: string = row['Предмет'];
                const productArticle: string = row['Артикул поставщика'];
                const productBrand: string = row['Бренд'];
                const productBarcode: number = +row['Баркод'];
                const productHatch: number = +row['ШК'];
                
                let product = new Product(
                    productCode,
                    productName,
                    productCategory,
                    productArticle,
                    productBrand,
                    productBarcode,
                    productHatch,
                );
                
                const foundProduct = uniqueProductList.find(uniqueProduct => uniqueProduct.id.compare(product.id));
                if (foundProduct) {
                    if (foundProduct.id.better(product.id)) product = foundProduct;
                    else {
                        uniqueProductList = uniqueProductList.filter(uniqueProduct => uniqueProduct !== foundProduct);
                        uniqueProductList.push(product);

                        result
                            .filter(action => action.product.id.compare(product.id))
                            .forEach(action => action.product = product);
                    }
                }
                else uniqueProductList.push(product);

                const id: ReportActionId = +row['№'];
                const fines: number = +row['Общая сумма штрафов'];
                const deliveryPrice: number = +row['Услуги по доставке товара покупателю'];
                const buyerPaid: number = +row['Вайлдберриз реализовал Товар (Пр)'];
                const transferredPrice: number = +row['К перечислению Продавцу за реализованный Товар'];
                const comment: string = row['Виды логистики, штрафов и доплат'];
                const paymentReason: string = row['Обоснование для оплаты'].toLowerCase();

                const typeDocumentConverted = typeof row['Тип документа'] === 'string' ? row['Тип документа'].toLowerCase() : ''
                const typeDocument: TypeDocument = typeDocumentMap[typeDocumentConverted] || 'unkown';
                let type: ReportActionType = reportActionTypeMap[paymentReason] || 'unkown';

                if (type === 'storage' || type === 'retention' || type === 'organization-fines') {
                    continue;
                } else if (type === 'delivery') {
                    const deliveryCount: number = +row['Количество доставок'];
                    const returnCount: number = +row['Количество возврата'];
                    
                    if (deliveryCount > 0) type = 'delivery';
                    else if (returnCount > 0) type = 'delivery-return';
                    else type = 'unkown';

                } else if (type === 'reversal' && typeDocument !== 'return') {
                    type = 'unkown';
                } else if (type === 'reversal-return' && typeDocument !== 'sale') {
                    type = 'unkown';
                } else if (type === 'marriage') {
                    switch (typeDocument) {
                        case 'sale':
                            type = 'marriage';
                            break;
                        case 'return':
                            type = 'marriage-return';
                            break;
                        default:
                            type = 'unkown';
                            break;
                    }
                } else if (type === 'lost-product') {
                    switch (typeDocument) {
                        case 'sale':
                            type = 'lost-product';
                            break;
                        case 'return':
                            type = 'lost-product-return';
                            break;
                        default:
                            type = 'unkown';
                            break;
                    }
                } else if (type === 'delivery-reversal' && typeDocument !== 'sale') {
                    type = 'unkown';
                } else if (type === 'without-movement') {
                    switch (typeDocument) {
                        case 'sale':
                            type = 'without-movement';
                            break;
                        case 'return':
                            type = 'without-movement-return';
                            break;
                        default:
                            type = 'unkown';
                            break;
                    }
                } else if (type === 'partial-marriage') {
                    switch (typeDocument) {
                        case 'sale':
                            type = 'partial-marriage';
                            break;
                        case 'return':
                            type = 'partial-marriage-return';
                            break;
                        default:
                            type = 'unkown';
                            break;
                    }
                } else if (type === 'payment-shipping-cost' && typeDocument !== 'unkown') {
                    type = 'unkown';
                } else if (type === 'compensation-replacement') {
                    switch (typeDocument) {
                        case 'sale':
                            type = 'compensation-replacement';
                            break;
                        case 'return':
                            type = 'compensation-replacement-return';
                            break;
                        default:
                            type = 'unkown';
                            break;
                    }
                }
                
                const reportAction = new ReportAction(
                    id,
                    type,
                    +(buyerPaid * 100).toFixed(),
                    +(transferredPrice * 100).toFixed(),
                    +(deliveryPrice * 100).toFixed(),
                    +(fines * 100).toFixed(),
                    comment,
                    product,
                );
                
                result.push(reportAction);
            }
        }

        return result;
    }
}