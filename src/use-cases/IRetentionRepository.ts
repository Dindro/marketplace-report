import type IRetentionData from '@/infastructure/RetentionRepository/IRetentionData';

export default interface IRetentionRepository {
    getList: () => Promise<IRetentionData[]>;
}