import type IStorageProductInterface from '@/use-cases/IStorageProductRepository';

export default class StorageProductRepository implements IStorageProductInterface {
    private value: number;
    
    constructor(value: number) {
        this.value = value;
    }
    
    get(): Promise<number> {
        return Promise.resolve(this.value);
    }
}