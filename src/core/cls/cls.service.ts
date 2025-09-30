import { Injectable } from '@nestjs/common';
import { ClsService as NestClsService } from 'nestjs-cls';

@Injectable()
export class ClsService {
    constructor(private readonly cls: NestClsService) { }

    set(key: string, value: any) {
        this.cls.set(key, value);
    }

    get<T>(key: string): T {
        return this.cls.get(key);
    }
}
