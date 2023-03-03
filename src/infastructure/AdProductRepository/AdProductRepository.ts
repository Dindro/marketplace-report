import type IAdProductRepository from '@/use-cases/IAdProductRepository';
import type IAdProductData from '@/infastructure/AdProductRepository/IAdProductData';

export default class AdProductRepository implements IAdProductRepository {
    private data: IAdProductData[];

    constructor(data: IAdProductData[]) {
        this.data = data;
    }

    getList(): Promise<IAdProductData[]> {
        return Promise.resolve(this.data);
    }
}