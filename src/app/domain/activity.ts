export class Activity {
    public id: string;
    public type: string;
    public repo: Reporsitory;
    public actor: Actor;
    public created_at: Date;
    public payload: any;
}

class Reporsitory {
    public id: number;
    public name: string;
    public url: string;
}

class Actor {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}