import ReportActionList from '@/entities/ReportActionList';
import UserFraction from '@/entities/UserFraction';

import type Product from '@/entities/Product';
import type ReportAction from '@/entities/ReportAction';
import type IGetReportReponseModel from '@/use-cases/GetReportUseCase/IGetReportResponseModel';
import type { DetailReportAction, IReportDetailRepository } from '@/use-cases/IReportDetailRepository';
import type IUserFractionRepository from '@/use-cases/IUserFractionRepository';
import type ProductId from '@/entities/ProductId';
import type { IFractionSummaryReport, IProductSummaryReport, ISummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';
import type { Maybe } from '@/types/common';
import type { UserId } from '@/entities/User';
import type User from '@/entities/User';
import type IUserRepository from '../IUserRepository';
import UserFractionPrice from '@/entities/UserFractionPrice';

export default class UploadReportUseCase {
    private readonly reportRepository: IReportDetailRepository;
    private readonly userFractionRepository: IUserFractionRepository;
    private readonly userRepository: IUserRepository;
    private readonly tax: number = 7;

    constructor(reportRepository: IReportDetailRepository, userFractionRepository: IUserFractionRepository, userRepository: IUserRepository) {
        this.reportRepository = reportRepository;
        this.userFractionRepository = userFractionRepository;
        this.userRepository = userRepository;
    }

    async execute(): Promise<IGetReportReponseModel> {
        const reportActions = await this.reportRepository.getList();
        const reportActionList = new ReportActionList(this.tax, ...reportActions);

        // Группируем Id продукта - Список репорторв
        const productIdActionListMap: Map<ProductId, ReportActionList> 
            = this.toGroupProductIdReportActionList(reportActionList);

        // Получаем Id продукта - Список долей
        const productIdUserFractionListMap: Map<ProductId, UserFraction[]>
            = await this.getProductIdUserFractionList(Array.from(productIdActionListMap.keys()));

        // Группируем Список долей - Список Id продуктов
        const userFractionListProductIdListMap: Map<UserFraction[], ProductId[]>
            = this.toGroupUserFractionListProuductIdList(productIdUserFractionListMap);

        const fractionSummaryList: IFractionSummaryReport[] = [];
        for (const [userFractionList, productIdList] of userFractionListProductIdListMap) {
            const productListReportActionList: ReportActionList[] = [];
            const productSummaryList: IProductSummaryReport[] = [];

            for (const productId of productIdList) {
                const reportActionList = productIdActionListMap.get(productId) as ReportActionList;
                const product = reportActionList.getProductByProductId(productId) as Product;                
                const summary = this.getSummaryReport(reportActionList);
                
                productSummaryList.push({ product, summary });
                productListReportActionList.push(reportActionList);
            }

            // Объединение отчета
            const fractionReportActionList: ReportActionList = new ReportActionList(this.tax);
            for (const reportList of productListReportActionList) {
                fractionReportActionList.push(...reportList);
            }

            const fractionSummary = this.getSummaryReport(fractionReportActionList);

            const userFractionPriceList: UserFractionPrice[] = [];
            for (const userFraction of userFractionList) {
                const userFractionPrice = new UserFractionPrice(userFraction, fractionReportActionList.revenuePriceWithoutTax);
                userFractionPriceList.push(userFractionPrice);
            }

            fractionSummaryList.push({
                userFractions: userFractionPriceList,
                summary: fractionSummary,
                products: productSummaryList,
            });
        }

        const summary: ISummaryReport = this.getSummaryReport(reportActionList);

        const response: IGetReportReponseModel = {
            summary,
            fractions: fractionSummaryList,
        };

        return Promise.resolve(response);
    }

    private toGroupProductIdReportActionList(reportActionList: ReportActionList): Map<ProductId, ReportActionList> {
        const map = new Map<ProductId, ReportActionList>();

        for (const reportAction of reportActionList) {
            let foundReportActionList = map.get(reportAction.product.id);
            if (!foundReportActionList) {
                foundReportActionList = new ReportActionList(reportActionList.taxPercent);
                map.set(reportAction.product.id, foundReportActionList);
            }
            foundReportActionList.push(reportAction);
        }

        return map;
    }

    private async getProductIdUserFractionList(productIdList: ProductId[]): Promise<Map<ProductId, UserFraction[]>> {
        const map = new Map<ProductId, UserFraction[]>();
        const userMap = new Map<UserId, User>();
        
        for (const productId of productIdList) {
            if (map.get(productId)) continue;

            // Список долей
            const userFractionList = await this.userFractionRepository.getByProductId(productId);
            
            for (const userFraction of userFractionList) {
                // Список ID пользователей не найденых в списке сохраненных
                const notFoundUserIdList = userFraction.userIds.filter(userId => !userMap.has(userId));

                if (notFoundUserIdList.length) {
                    const foundUserList = await this.userRepository.getByIds(notFoundUserIdList);

                    // Сохраянем в список сохраненных
                    for (const maybeUser of foundUserList) {
                        let user = maybeUser;
                        if (!user) {
                            user = await this.userRepository.createAnonymous();
                        }

                        userMap.set(user.id, user);
                    }
                }
            
                const foundUserList = userFraction.userIds.map(userId => userMap.get(userId)) as User[];
                userFraction.users = foundUserList;
            }

            map.set(productId, userFractionList);
        }

        return map;
    }

    private toGroupUserFractionListProuductIdList(productMap: Map<ProductId, UserFraction[]>): Map<UserFraction[], ProductId[]> {
        const map = new Map<UserFraction[], ProductId[]>();

        for (const [productId, userFractionList] of productMap) {
            let foundProductIdList: Maybe<ProductId[]> = null;

            for (const [resultUserFractionList, resultProductIdList] of map) {
                const same = UserFraction.compareList(userFractionList, resultUserFractionList);
                if (same) {
                    foundProductIdList = resultProductIdList;
                    break;
                }
            }

            if (!foundProductIdList) {
                foundProductIdList = [];
                map.set(userFractionList, foundProductIdList);
            }
            foundProductIdList.push(productId);
        }

        return map;
    }

    private getSummaryReport(reportActionList: ReportActionList): ISummaryReport {
        return {
            unkownCount: reportActionList.unkownCount,
            price: reportActionList.price,
            marriage: reportActionList.marriagePrice,
            marriageCount: reportActionList.marriageCount,
            buyCorrect: reportActionList.buyCorrectPrice,
            buyCorrectCount: reportActionList.buyCorrectCount,
            lost: reportActionList.lostProductPrice,
            lostCount: reportActionList.lostProductCount,
            delivery: reportActionList.deliveryPrice,
            deliveryCount: reportActionList.deliveryCount,
            deliveryReturn: reportActionList.deliveryReturnPrice,
            deliveryReturnCount: reportActionList.deliveryReturnCount,
            return: reportActionList.returnPrice,
            returnCount: reportActionList.returnCount,
            fines: reportActionList.finesPrice,
            finesCount: reportActionList.finesCount,
            tax: reportActionList.tax,
            taxPercent: reportActionList.taxPercent,
            taxSource: reportActionList.taxSource,
            revenue: reportActionList.revenuePrice,
            revenueWithoutTax: reportActionList.revenuePriceWithoutTax,
        };
    }
}