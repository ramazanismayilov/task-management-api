import { Module } from '@nestjs/common';
import { ClsService } from './cls.service';
import { ClsModule as NestClsModule } from 'nestjs-cls';
import { Request } from 'express';

@Module({
    imports: [
        NestClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                setup: (cls, req: Request) => {
                    cls.set('ip', req.ip);
                },
            },
        }),
    ],
    providers: [ClsService],
    exports: [ClsService],
})
export class ClsModule { }
