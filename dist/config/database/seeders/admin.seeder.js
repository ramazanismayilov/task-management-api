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
var AdminSeeder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSeeder = void 0;
const bcrypt = require("bcrypt");
const role_enum_1 = require("../../../common/enums/role.enum");
const role_entity_1 = require("../../../modules/roles/entities/role.entity");
const user_entity_1 = require("../../../modules/users/entities/user.entity");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
let AdminSeeder = AdminSeeder_1 = class AdminSeeder {
    constructor(logger) {
        this.logger = logger;
    }
    async run(dataSource) {
        const roleRepo = dataSource.getRepository(role_entity_1.RoleEntity);
        const userRepo = dataSource.getRepository(user_entity_1.UserEntity);
        let adminRole = await roleRepo.findOne({ where: { name: role_enum_1.Role.SUPER_ADMIN } });
        if (!adminRole) {
            adminRole = roleRepo.create({ name: role_enum_1.Role.SUPER_ADMIN });
            await roleRepo.save(adminRole);
            this.logger.log(`Role "${role_enum_1.Role.SUPER_ADMIN}" created successfully`, AdminSeeder_1.name);
        }
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });
        if (existingAdmin) {
            this.logger.log(`Super admin already exists (email: ${adminEmail})`, AdminSeeder_1.name);
        }
        else {
            const password = await bcrypt.hash(adminPassword, 10);
            const adminUser = userRepo.create({
                email: adminEmail,
                password,
                role: adminRole,
                isActive: true,
                profile: { fullName: 'Ramazan İsmayılov' },
            });
            await userRepo.save(adminUser);
            this.logger.log(`Super admin created successfully (email: ${adminEmail})`, AdminSeeder_1.name);
        }
        this.logger.log('Super admin seeding completed', AdminSeeder_1.name);
    }
};
exports.AdminSeeder = AdminSeeder;
exports.AdminSeeder = AdminSeeder = AdminSeeder_1 = __decorate([
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], AdminSeeder);
//# sourceMappingURL=admin.seeder.js.map