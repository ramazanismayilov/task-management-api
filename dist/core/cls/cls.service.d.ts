import { ClsService as NestClsService } from 'nestjs-cls';
export declare class ClsService {
    private readonly cls;
    constructor(cls: NestClsService);
    set(key: string, value: any): void;
    get<T>(key: string): T;
}
