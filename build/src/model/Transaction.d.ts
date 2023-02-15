declare class Transaction {
    private t_id;
    private user_id;
    private type;
    private amount;
    constructor(t_id: number, user_id: number, type: string, amount: number);
    toString: () => string;
}
declare const recordTransaction: (req: any, res: object) => Promise<boolean>;
declare const getTransactions: (req: any, res: object) => Promise<void>;
export { Transaction, recordTransaction, getTransactions };
