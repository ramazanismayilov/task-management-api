"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
let MailerModule = class MailerModule {
};
exports.MailerModule = MailerModule;
exports.MailerModule = MailerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory(config) {
                    return {
                        transport: {
                            service: 'gmail',
                            host: config.get('SMTP_HOST'),
                            port: Number(config.get('SMTP_PORT')),
                            secure: Boolean(config.get('SMTP_SECURE')),
                            auth: {
                                user: config.get('SMTP_USER'),
                                pass: config.get('SMTP_PASSWORD'),
                            },
                        },
                        defaults: { from: `"TaskMaster" <${config.get('SMTP_FROM')}>` },
                        template: {
                            dir: (0, path_1.join)(__dirname, '../../../src/templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: { strict: true },
                        },
                    };
                },
            }),
        ],
        exports: [mailer_1.MailerModule],
    })
], MailerModule);
//# sourceMappingURL=mailer.module.js.map