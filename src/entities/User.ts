export type UserId = number;

export default class User {
    id: UserId;
    
    name: string;

    constructor(id: UserId, name: string) {
        this.id = id;
        this.name = name;
    }
}