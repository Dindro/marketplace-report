export type UserId = number;

export default class User {
    id: UserId;
    
    name: string;

    constructor(id: UserId, name: string) {
        this.id = id;
        this.name = name;
    }

    static createUndefinedUser(userId: UserId): User {
        return new User(userId, 'Неизвестный');
    }

    static compareUsers(a: User[], b: User[]): boolean {
        if (a.length === b.length) {
            return a.every(aUser => b.find(bUser => this.compareUser(bUser, aUser)));
        }

        return false;
    }

    static compareUser(a: User, b: User): boolean {
        return a.id === b.id;
    }
}