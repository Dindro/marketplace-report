import type IAdProductData from '@/infastructure/AdProductRepository/IAdProductData';

export default interface IAdProductRepository {
    getList: () => Promise<IAdProductData[]>;
}