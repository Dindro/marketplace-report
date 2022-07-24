import ReportAction, { type ReportActionType } from '@/entities/ReportAction';
import Product from '@/entities/Product';
import ReportActionList from '@/entities/ReportActionList';

import type IUploadReportRequestModel from '@/use-cases/UploadReport/IUploadReportRequestModel';
import type IUploadReportReponseModel from '@/use-cases/UploadReport/IUploadReportResponseModel';
import type { DetailReportAction, IReportDetailRepository } from '@/use-cases/IReportDetailRepository';
// import type { IUserFractionRepository } from '@/use-cases/IUserFractionRepository';
import type UserFraction from '@/entities/UserFraction';
import type { ProductId } from '@/entities/Product';
import type { IProductInfoResponse } from '@/use-cases/UploadReport/IUploadReportResponseModel';

const STATE_TAX = 6;

export default class UploadReportUseCase {
    readonly reportRepository: IReportDetailRepository;
    // readonly userFractionRepository: IUserFractionRepository;

    constructor(report: IReportDetailRepository, /** userFraction: IUserFractionRepository */) {
        this.reportRepository = report;
        // this.userFractionRepository = userFraction;
    }

    async execute(/** request: IUploadReportRequestModel */): Promise<IUploadReportReponseModel> {
        const actionList: ReportAction[] = await this.reportRepository.getList();
        const reportActionList = new ReportActionList(STATE_TAX, ...actionList);
        
        // Собираем отчет для одного продукта
        const actionListMap = new Map<ProductId, ReportActionList>();
        for (const action of reportActionList) {
            const actionList = actionListMap.get(action.product.id);
            if (actionList) {
                actionList.push(action);
            } else {
                actionListMap.set(action.product.id, new ReportActionList(STATE_TAX, action));
            }
        }

        // const productUserFractionMap = new Map<ProductId, UserFraction[]>();
        // for (const productId of actionListMap.keys()) {
        //     const userFractionList = await this.userFractionRepository.getByProductId(productId);
        //     productUserFractionMap.set(productId, userFractionList);
        // }

        const productActionList = [...actionListMap.values()];
        const fractionMap = this.getFraction(productActionList);
        const productListInfo: IProductInfoResponse[] = [];
        for (const actionList of productActionList) {
            const product = actionList[0].product;

            const productInfo: IProductInfoResponse = {
                delivery: actionList.deliveryPrice,
                orderCount: actionList.orderCount,
                price: actionList.price,
                return: actionList.returnPrice,
                stateTax: actionList.stateTax,
                product,
                fraction: fractionMap.get(product.id) || 0,
                revenue: actionList.revenuePriceWithouteStateTax,
            };

            productListInfo.push(productInfo);
        }


        const response: IUploadReportReponseModel = {
            delivery: reportActionList.deliveryPrice,
            price: reportActionList.revenuePrice,
            stateTax: reportActionList.stateTax,
            return: reportActionList.returnPrice,
            orderCount: reportActionList.orderCount,
            revenue: reportActionList.revenuePrice,
            productList: productListInfo,
        };

        return Promise.resolve(response);
    }

    getFraction(productActionList: ReportActionList[]) {
        const commonPrice = productActionList.reduce((sum, actionList) => sum + actionList.price, 0);
        const fractionMap = new Map<ProductId, number>();

        for (const actionList of productActionList) {
            const productId = actionList[0].product.id;
            fractionMap.set(productId, actionList.price * 100 / commonPrice);
        }

        return fractionMap;
    }
}