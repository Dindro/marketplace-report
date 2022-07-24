import * as XLSX from 'xlsx';

import ReportAction from '@/entities/ReportAction';
import Product from '@/entities/Product';
import type { IReportDetailRepository, DetailReportAction } from '@/use-cases/IReportDetailRepository';
import type { ReportActionType } from '@/entities/ReportAction';
import type { ProductId } from '@/entities/Product';
import type { ReportActionId } from '@/entities/ReportAction';

export class ReportDetailRepository implements IReportDetailRepository {
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
        let result = [];

        if (Array.isArray(data)) {
            const productBarcodeMap = new Map<number, Product>();

            for (const row of data) {
                const id: ReportActionId = row['Rid'];
                const fines: number = row['Штрафы'];
                
                const productId: ProductId = row['Код номенклатуры']
                const productName: string = row['Название'];
                const productCategory: string = row['Предмет'];
                const productArticle: string = row['Артикул поставщика'];
                const productBrand: string = row['Бренд'];
                const productBarcode: number = Number(row['Баркод']);

                const deliveryCount: number = row['Количество доставок'];
                const deliveryPrice: number = row['Услуги по доставке товара покупателю'];
                const returnCount: number = row['Количество возврата'];
                const transferredToSellerPrice: number = row['К перечислению Продавцу за реализованный Товар'];

                let foundProduct = productBarcodeMap.get(productBarcode);
                const hasUndefinedId = foundProduct && foundProduct.id === 0;
                if (hasUndefinedId || !foundProduct) {
                    foundProduct = new Product(
                        productId,
                        productName,
                        productCategory,
                        productArticle,
                        productBrand,
                        productBarcode,
                    );
                    productBarcodeMap.set(foundProduct.barcode, foundProduct);
                }

                const reportActionType: ReportActionType = !!deliveryCount
                    ? 'delivery' 
                    : (!!returnCount ? 'return' : 'buy');

                const reportAction = new ReportAction(
                    id,
                    reportActionType,
                    transferredToSellerPrice * 100,
                    deliveryPrice * 100,
                    fines,
                    foundProduct,
                );
                
                result.push(reportAction);
            }
        }

        window.a = result;

        return result;
    }
}