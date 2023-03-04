import ReportActionList from '@/entities/ReportActionList';
import UserFraction from '@/entities/UserFraction';
import ReportAction from '@/entities/ReportAction';
import UserFractionPrice from '@/entities/UserFractionPrice';

import type Product from '@/entities/Product';
import type ProductId from '@/entities/ProductId';
import type User from '@/entities/User';
import type IGetReportReponseModel from '@/use-cases/GetReportUseCase/IGetReportResponseModel';
import type { IReportDetailRepository } from '@/use-cases/IReportDetailRepository';
import type IUserFractionRepository from '@/use-cases/IUserFractionRepository';
import type { IFractionSummaryReport, IProductSummaryReport, ISummaryReport } from '@/use-cases/GetReportUseCase/IGetReportResponseModel';
import type { Maybe } from '@/types/common';
import type { UserId } from '@/entities/User';
import type IUserRepository from '../IUserRepository';
import type IProductPictureRepository from '@/use-cases/IProductPictureRepository';
import type IAdProductRepository from '@/use-cases/IAdProductRepository';
import type IAdProductData from '@/infastructure/AdProductRepository/IAdProductData';
import type IStorageProductRepository from '@/use-cases/IStorageProductRepository';

export default class UploadReportUseCase {
    private readonly reportRepository: IReportDetailRepository;
    private readonly userFractionRepository: IUserFractionRepository;
    private readonly userRepository: IUserRepository;
    private readonly productPictureRepository: IProductPictureRepository;
    private readonly adProductRepository: IAdProductRepository;
    private readonly storageProductRepository: IStorageProductRepository;
    private readonly tax: number = 7;
    private underpayment: number;

    constructor(
        reportRepository: IReportDetailRepository,
        userFractionRepository: IUserFractionRepository,
        userRepository: IUserRepository,
        productPictureRepository: IProductPictureRepository,
        adProductRepository: IAdProductRepository,
        storageProductRepository: IStorageProductRepository,
        underpayment: number = 0,
    ) {
        this.reportRepository = reportRepository;
        this.userFractionRepository = userFractionRepository;
        this.userRepository = userRepository;
        this.productPictureRepository = productPictureRepository;
        this.adProductRepository = adProductRepository;
        this.storageProductRepository = storageProductRepository;
        this.underpayment = underpayment;
    }

    async execute(): Promise<IGetReportReponseModel> {
        const reportActions = await this.reportRepository.getList();
        const reportActionList = new ReportActionList(this.tax, ...reportActions);

        const ads: IAdProductData[] = await this.adProductRepository.getList();
        for (const ad of ads) {
            const reportId = reportActionList.lastId + 1;
            const product = reportActionList.getProductByProductId(ad.productId) as Product;
            const report = new ReportAction(reportId, 'ad', ad.price, 0, 0, 0, '', product);
            reportActionList.push(report);
        }

        // Группируем Id продукта - Список репортов
        let productIdActionListMap: Map<ProductId, ReportActionList>
            = this.toGroupProductIdReportActionList(reportActionList);

        const storage = await this.storageProductRepository.get();
        if (storage > 0) {
            const saleCount = reportActionList.saleCommonCount;
            if (saleCount) {
                for (const [productId, productReports] of productIdActionListMap) {
                    if (!productReports.saleCommonCount) continue;
                    const productStorage = storage / saleCount * productReports.saleCommonCount;
                    const reportId = reportActionList.lastId + 1;
                    const product = reportActionList.getProductByProductId(productId) as Product;
                    const report = new ReportAction(reportId, 'storage', productStorage, 0, 0, 0, '', product);
                    reportActionList.push(report);
                }
            } else {
                const productCount = reportActionList.uniqueProductIdList.length;
                for (const [productId] of productIdActionListMap) {
                    const productStorage = storage / productCount;
                    const reportId = reportActionList.lastId + 1;
                    const product = reportActionList.getProductByProductId(productId) as Product;
                    const report = new ReportAction(reportId, 'storage', productStorage, 0, 0, 0, '', product);
                    reportActionList.push(report);
                }
            }
        }

        if (this.underpayment > 0) {
            const price = reportActionList.transferredForProducts;
            if (price > 0) {
                for (const [productId, productReports] of productIdActionListMap) {
                    if (productReports.transferredForProducts <= 0) continue;
                    const productUnderpayment = this.underpayment / price * productReports.transferredForProducts;
                    const reportId = reportActionList.lastId + 1;
                    const product = reportActionList.getProductByProductId(productId) as Product;
                    const report = new ReportAction(reportId, 'underpayment', productUnderpayment, 0, 0, 0, '', product);
                    reportActionList.push(report);
                }
            } else {
                const productCount = reportActionList.uniqueProductIdList.length;
                for (const [productId] of productIdActionListMap) {
                    const productUnderpayment = this.underpayment / productCount;
                    const reportId = reportActionList.lastId + 1;
                    const product = reportActionList.getProductByProductId(productId) as Product;
                    const report = new ReportAction(reportId, 'underpayment', productUnderpayment, 0, 0, 0, '', product);
                    reportActionList.push(report);
                }
            }
        }

        // Группируем Id продукта - Список репортов
        productIdActionListMap
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
                if (product.code) product.picture = await this.productPictureRepository.get(product.code);

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
            buyerPaid: reportActionList.buyerPaid,
            transferredForProducts: reportActionList.transferredForProducts,
            saleCount: reportActionList.saleCount,
            sale: reportActionList.salePrice,
            marriage: reportActionList.marriagePrice,
            marriageCount: reportActionList.marriageCount,
            saleCorrect: reportActionList.saleCorrectPrice,
            saleCorrectCount: reportActionList.saleCorrectCount,
            lost: reportActionList.lostProductPrice,
            lostCount: reportActionList.lostProductCount,
            delivery: reportActionList.deliveryPrice,
            deliveryCount: reportActionList.deliveryCount,
            deliveryReturn: reportActionList.deliveryReturnPrice,
            deliveryReturnCount: reportActionList.deliveryReturnCount,
            deliveryCommon: reportActionList.deliveryCommonPrice,
            deliveryCommonCount: reportActionList.deliveryCommonCount,
            return: reportActionList.returnPrice,
            returnCount: reportActionList.returnCount,
            returnCorrect: reportActionList.returnCorrectPrice,
            returnCorrectCount: reportActionList.returnCorrectCount,
            reversal: reportActionList.reversalPrice,
            reversalCount: reportActionList.reversalCount,
            reversalReturn: reportActionList.reveralReturnPrice,
            reversalReturnCount: reportActionList.reversalReturnCount,
            ad: reportActionList.adPrice,
            adCount: reportActionList.adCount,
            storage: reportActionList.storagePrice,
            underpayment: reportActionList.underpaymentPrice,
            fines: reportActionList.finesPrice,
            finesCount: reportActionList.finesCount,
            finesDescription: reportActionList.finesDescription,
            tax: reportActionList.tax,
            taxPercent: reportActionList.taxPercent,
            taxSource: reportActionList.taxSource,
            revenue: reportActionList.revenuePrice,
            revenueWithoutTax: reportActionList.revenuePriceWithoutTax,
        };
    }
}