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

    static compareUsersId(a: UserId[], b: UserId[]): boolean {
        if (a.length === b.length) {
            const aSorted = a.sort();
            const bSorted = b.sort();

            return aSorted.every((value, index) => value === bSorted[index]);
        }
        
        return false;
    }

    static compareUsers(a: User[], b: User[]): boolean {
        const aId = a.map(user => user.id);
        const bId = a.map(user => user.id);

        return this.compareUsersId(aId, bId);
    }
}