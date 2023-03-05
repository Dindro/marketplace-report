import type IReceptionProductRepository from '@/use-cases/IReceptionProductRepository';
import type IReceptionProductData from '@/infastructure/ReceptionProductRepository/IReceptionProductData';

export default class ReceptionProductRepository implements IReceptionProductRepository {
    private data: IReceptionProductData[];

    constructor(data: IReceptionProductData[]) {
        this.data = data;
    }

    getPaidList(): Promise<IReceptionProductData[]> {
        return Promise.resolve(this.data);
    }
}