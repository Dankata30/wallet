declare class User {
    private user_id;
    private balance;
    private permissions;
    private username;
    constructor(user_id: number, balance: number, permissions: string, username: string);
    getUId(): number;
    getBalance(): number;
    getPermissions(): string;
    getUserName(): string;
    updateBalance(sum: number): void;
}
declare const checkPermissions: (user: User) => boolean;
declare const checkBalance: (user: User, withdraw: number) => boolean;
declare const checkUser: (req: any, res: object) => Promise<User>;
declare const getUser: (req: any, res: object) => Promise<void>;
declare const updateBalance: (req: any, res: object) => Promise<void>;
declare const registerUser: (req: any, res: object) => Promise<void>;
export { User, checkUser, getUser, checkPermissions, updateBalance, checkBalance, registerUser, };
