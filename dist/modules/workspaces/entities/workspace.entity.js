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
exports.WorkspaceEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const workspace_type_entity_1 = require("./workspace-type.entity");
const organization_entity_1 = require("../../../modules/organizations/entities/organization.entity");
const project_entity_1 = require("../../../modules/projects/entities/project.entity");
let WorkspaceEntity = class WorkspaceEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, type: { required: true, type: () => require("./workspace-type.entity").WorkspaceTypeEntity }, projects: { required: true, type: () => [require("../../projects/entities/project.entity").ProjectEntity] }, description: { required: true, type: () => String }, organization: { required: true, type: () => require("../../organizations/entities/organization.entity").OrganizationEntity }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.WorkspaceEntity = WorkspaceEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkspaceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkspaceEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workspace_type_entity_1.WorkspaceTypeEntity, (type) => type.workspaces, { eager: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: 'typeId' }),
    __metadata("design:type", workspace_type_entity_1.WorkspaceTypeEntity)
], WorkspaceEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.ProjectEntity, (column) => column.workspace, { cascade: true }),
    __metadata("design:type", Array)
], WorkspaceEntity.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WorkspaceEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.OrganizationEntity, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.OrganizationEntity)
], WorkspaceEntity.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WorkspaceEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WorkspaceEntity.prototype, "updatedAt", void 0);
exports.WorkspaceEntity = WorkspaceEntity = __decorate([
    (0, typeorm_1.Entity)('workspaces')
], WorkspaceEntity);
//# sourceMappingURL=workspace.entity.js.map