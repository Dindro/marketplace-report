import type IRetentionRepository from '@/use-cases/IRetentionRepository';
import type IRetentionData from '@/infastructure/RetentionRepository/IRetentionData';

export default class RetentionRepository implements IRetentionRepository {
    private data: IRetentionData[];

    constructor(data: IRetentionData[]) {
        this.data = data;
    }

    getList(): Promise<IRetentionData[]> {
        return Promise.resolve(this.data);
    }
}