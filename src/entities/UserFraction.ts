import type User from '@/entities/User';

export type UserFractionId = number;

export default class UserFraction {
    id: UserFractionId;

    users: User[];

    /** Значение доли, % */
    private fractionValue: number = 0;

    constructor(id: UserFractionId, users: User[], fraction: number) {
        this.id = id;
        this.users = users;
        this.fraction = fraction;
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
}