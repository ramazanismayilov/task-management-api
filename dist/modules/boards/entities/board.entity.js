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
exports.BoardEntity = void 0;
const openapi = require("@nestjs/swagger");
const project_entity_1 = require("../../../modules/projects/entities/project.entity");
const typeorm_1 = require("typeorm");
const board_column_entity_1 = require("./board-column.entity");
let BoardEntity = class BoardEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, project: { required: true, type: () => require("../../projects/entities/project.entity").ProjectEntity }, columns: { required: true, type: () => [require("./board-column.entity").BoardColumnEntity] }, isActive: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.BoardEntity = BoardEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BoardEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BoardEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BoardEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, (project) => project.boards, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], BoardEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => board_column_entity_1.BoardColumnEntity, (column) => column.board, { cascade: true }),
    __metadata("design:type", Array)
], BoardEntity.prototype, "columns", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], BoardEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BoardEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BoardEntity.prototype, "updatedAt", void 0);
exports.BoardEntity = BoardEntity = __decorate([
    (0, typeorm_1.Entity)('boards')
], BoardEntity);
//# sourceMappingURL=board.entity.js.map