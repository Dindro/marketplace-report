import type UserFraction from '@/entities/UserFraction';

export default class UserFractionPrice {
    userFraction: UserFraction;
    
    private value: number;
    
    constructor(userFraction: UserFraction, value: number) {
        this.userFraction = userFraction;
        this.value = value;
    }

    get price(): number {
        return this.value / 100 * this.userFraction.fraction;
    }
}