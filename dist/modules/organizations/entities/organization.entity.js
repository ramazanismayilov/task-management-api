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
exports.OrganizationEntity = void 0;
const openapi = require("@nestjs/swagger");
const attachment_entity_1 = require("../../../modules/attachments/entity/attachment.entity");
const workspace_entity_1 = require("../../../modules/workspaces/entities/workspace.entity");
const typeorm_1 = require("typeorm");
let OrganizationEntity = class OrganizationEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, logo: { required: true, type: () => require("../../attachments/entity/attachment.entity").AttachmentEntity, nullable: true }, workspaces: { required: true, type: () => [require("../../workspaces/entities/workspace.entity").WorkspaceEntity] }, isActive: { required: true, type: () => Boolean }, domain: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.OrganizationEntity = OrganizationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrganizationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => attachment_entity_1.AttachmentEntity, { eager: true, nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: 'logoId' }),
    __metadata("design:type", Object)
], OrganizationEntity.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workspace_entity_1.WorkspaceEntity, (workspace) => workspace.organization),
    __metadata("design:type", Array)
], OrganizationEntity.prototype, "workspaces", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OrganizationEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationEntity.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], OrganizationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], OrganizationEntity.prototype, "updatedAt", void 0);
exports.OrganizationEntity = OrganizationEntity = __decorate([
    (0, typeorm_1.Entity)('organizations')
], OrganizationEntity);
//# sourceMappingURL=organization.entity.js.map