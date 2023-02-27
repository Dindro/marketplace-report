import User, { type UserId } from '@/entities/User';
import type ProductId from '@/entities/ProductId';

export type UserFractionId = number;

export default class UserFraction {
    id: UserFractionId;

    userIds: UserId[];

    users: User[] = [];

    productId: ProductId;

    /** Значение доли, % */
    private fractionValue: number = 0;

    constructor(id: UserFractionId, users: UserId[], fraction: number, productId: ProductId) {
        this.id = id;
        this.userIds = users;
        this.fraction = fraction;
        this.productId = productId;
    }

    get name(): string {
        if (this.users.length) return this.users.map(user => user.name).join('&');
        else return this.userIds.join('&');
    }

    get fraction(): number {
        return this.fractionValue;
    }

    set fraction(value: number) {
        if (value > 100) {
            this.fractionValue = 100;
        } else if (value < 0) {
            this.fractionValue = 0;
        } else {
            this.fractionValue = value;
        }
    }

    static compareList(a: UserFraction[], b: UserFraction[]): boolean {
        if (a.length === b.length) {
            return a.every(aUserFraction => b.find(bUserFraction => bUserFraction.compare(aUserFraction)));
        }

        return false;
    }

    compare(comparable: UserFraction): boolean {
        if (this.fraction === comparable.fraction) return User.compareUsersId(this.userIds, comparable.userIds);

        return false;
    }
}