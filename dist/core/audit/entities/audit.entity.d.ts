export declare class AuditEntity {
    id: string;
    userId: number | null;
    method: string;
    url: string;
    status: number;
    meta: any;
    createdAt: Date;
}
