import type IReceptionProductData from '@/infastructure/ReceptionProductRepository/IReceptionProductData';

export default interface IReceptionProductRepository {
    getPaidList: () => Promise<IReceptionProductData[]>;
}