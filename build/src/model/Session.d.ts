declare class Session {
    private session_id;
    private user_id;
    private is_active;
    private expiry;
    constructor(session_id: number, user_id: number, is_active: boolean, expiry: string);
    getExpiry(): string;
}
declare const createSession: (req: any, res: object) => Promise<boolean>;
declare const extendSession: (req: any, res: object) => Promise<boolean>;
declare const checkSession: (req: any, res: object) => Promise<void>;
declare const deactivateSession: (req: any, res: object) => Promise<boolean>;
export { Session, createSession, checkSession, deactivateSession, extendSession };
