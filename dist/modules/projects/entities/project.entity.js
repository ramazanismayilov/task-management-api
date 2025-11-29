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
exports.ProjectEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const workspace_entity_1 = require("../../../modules/workspaces/entities/workspace.entity");
const board_entity_1 = require("../../../modules/boards/entities/board.entity");
const project_member_entity_1 = require("./project_member.entity");
let ProjectEntity = class ProjectEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, workspace: { required: true, type: () => require("../../workspaces/entities/workspace.entity").WorkspaceEntity }, boards: { required: true, type: () => [require("../../boards/entities/board.entity").BoardEntity] }, members: { required: true, type: () => [require("./project_member.entity").ProjectMemberEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.ProjectEntity = ProjectEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workspace_entity_1.WorkspaceEntity, (workspace) => workspace.projects, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'workspaceId' }),
    __metadata("design:type", workspace_entity_1.WorkspaceEntity)
], ProjectEntity.prototype, "workspace", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_entity_1.BoardEntity, (board) => board.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "boards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_member_entity_1.ProjectMemberEntity, member => member.project, { cascade: true }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProjectEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProjectEntity.prototype, "updatedAt", void 0);
exports.ProjectEntity = ProjectEntity = __decorate([
    (0, typeorm_1.Entity)('projects')
], ProjectEntity);
//# sourceMappingURL=project.entity.js.map