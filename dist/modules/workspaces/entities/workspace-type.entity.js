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
exports.WorkspaceTypeEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const workspace_entity_1 = require("./workspace.entity");
let WorkspaceTypeEntity = class WorkspaceTypeEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, workspaces: { required: true, type: () => [require("./workspace.entity").WorkspaceEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.WorkspaceTypeEntity = WorkspaceTypeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkspaceTypeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], WorkspaceTypeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workspace_entity_1.WorkspaceEntity, (workspace) => workspace.type),
    __metadata("design:type", Array)
], WorkspaceTypeEntity.prototype, "workspaces", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WorkspaceTypeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WorkspaceTypeEntity.prototype, "updatedAt", void 0);
exports.WorkspaceTypeEntity = WorkspaceTypeEntity = __decorate([
    (0, typeorm_1.Entity)('workspace_types')
], WorkspaceTypeEntity);
//# sourceMappingURL=workspace-type.entity.js.map