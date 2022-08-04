import User from '@/entities/User';
import type { ProductId } from './Product';

export type UserFractionId = number;

export default class UserFraction {
    id: UserFractionId;

    users: User[];

    productId: ProductId;

    /** Значение доли, % */
    private fractionValue: number = 0;

    constructor(id: UserFractionId, users: User[], fraction: number, productId: ProductId) {
        this.id = id;
        this.users = users;
        this.fraction = fraction;
        this.productId = productId;
    }

    get name() {
        return this.users.map(user => user.name).join('&');
    }

    get fraction() {
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

    static compareUserFractions(a: UserFraction[], b: UserFraction[]): boolean {
        if (a.length === b.length) {
            return a.every(aUserFraction => b.find(bUserFraction => UserFraction.compareUserFraction(bUserFraction, aUserFraction)));
        }

        return false;
    }

    static compareUserFraction(a: UserFraction, b: UserFraction): boolean {
        if (a.fraction === b.fraction) {
            return User.compareUsers(a.users, b.users);
        }

        return false;
    }

    static toGroupUserFractionsBySame(userFractionsList: UserFraction[][]): UserFraction[][][] {
        const grouped: UserFraction[][][] = [];

        for (let index = 0; index < userFractionsList.length; index++) {
            const userFractions = userFractionsList[index];
            
            for (let groupedIndex = 0; groupedIndex < grouped.length; groupedIndex++) {
                const groupedUserFractionsList = grouped[groupedIndex];
                const groupedUserFractions = groupedUserFractionsList[0];
                const compared = UserFraction.compareUserFractions(userFractions, groupedUserFractions);
                if (compared) {
                    groupedUserFractionsList.push(groupedUserFractions);
                } else {
                    grouped.push([groupedUserFractions]);
                }
            }
        }

        return grouped;
    }

    static getProductIdsUserFractionsMap(groupedUserFractionsBySame: UserFraction[][][]): Map<ProductId[], UserFraction[]> {
        const map = new Map<ProductId[], UserFraction[]>();
        
        for (const groupedUserFractionsList of groupedUserFractionsBySame) {
            const productIds: ProductId[] = [];

            for (const groupedUserFractions of groupedUserFractionsList) {
                productIds.push(groupedUserFractions[0].productId);
            }

            map.set(productIds, groupedUserFractionsList[0]);
        }

        return map;
    }
}