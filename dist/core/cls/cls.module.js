"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClsModule = void 0;
const common_1 = require("@nestjs/common");
const cls_service_1 = require("./cls.service");
const nestjs_cls_1 = require("nestjs-cls");
let ClsModule = class ClsModule {
};
exports.ClsModule = ClsModule;
exports.ClsModule = ClsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: true,
                    setup: (cls, req) => {
                        cls.set('ip', req.ip);
                    },
                },
            }),
        ],
        providers: [cls_service_1.ClsService],
        exports: [cls_service_1.ClsService],
    })
], ClsModule);
//# sourceMappingURL=cls.module.js.map