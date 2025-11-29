"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RoleSeeder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSeeder = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const role_enum_1 = require("../../../common/enums/role.enum");
const role_entity_1 = require("../../../modules/roles/entities/role.entity");
let RoleSeeder = RoleSeeder_1 = class RoleSeeder {
    constructor(logger) {
        this.logger = logger;
    }
    async run(dataSource) {
        const roleRepo = dataSource.getRepository(role_entity_1.RoleEntity);
        const roles = [
            role_enum_1.Role.SUPER_ADMIN,
            role_enum_1.Role.ORGANIZATION_ADMIN,
            role_enum_1.Role.TEAM_LEAD,
            role_enum_1.Role.USER,
        ];
        for (const name of roles) {
            const existsRole = await roleRepo.findOne({ where: { name } });
            if (existsRole) {
                this.logger.log(`Role "${name}" already exists (id: ${existsRole.id})`, RoleSeeder_1.name);
            }
            else {
                const role = roleRepo.create({ name });
                await roleRepo.save(role);
                this.logger.log(`Role "${name}" created successfully`, RoleSeeder_1.name);
            }
        }
        this.logger.log('Role seeding completed', RoleSeeder_1.name);
    }
};
exports.RoleSeeder = RoleSeeder;
exports.RoleSeeder = RoleSeeder = RoleSeeder_1 = __decorate([
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], RoleSeeder);
//# sourceMappingURL=role.seeder.js.map