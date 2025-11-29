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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileEntity = void 0;
const openapi = require("@nestjs/swagger");
const attachment_entity_1 = require("../../../modules/attachments/entity/attachment.entity");
const user_entity_1 = require("../../../modules/users/entities/user.entity");
const typeorm_1 = require("typeorm");
let ProfileEntity = class ProfileEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user: { required: true, type: () => require("../../users/entities/user.entity").UserEntity }, fullName: { required: true, type: () => String }, bio: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, location: { required: true, type: () => String }, avatar: { required: true, type: () => require("../../attachments/entity/attachment.entity").AttachmentEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.ProfileEntity = ProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.profile, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProfileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => attachment_entity_1.AttachmentEntity, { eager: true, nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: 'avatarId' }),
    __metadata("design:type", attachment_entity_1.AttachmentEntity)
], ProfileEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], ProfileEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], ProfileEntity.prototype, "updatedAt", void 0);
exports.ProfileEntity = ProfileEntity = __decorate([
    (0, typeorm_1.Entity)('profiles')
], ProfileEntity);
//# sourceMappingURL=profile.entity.js.map