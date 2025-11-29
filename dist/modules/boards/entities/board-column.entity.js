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
exports.BoardColumnEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const board_entity_1 = require("./board.entity");
const task_entity_1 = require("../../../modules/tasks/entities/task.entity");
let BoardColumnEntity = class BoardColumnEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, position: { required: true, type: () => Number }, board: { required: true, type: () => require("./board.entity").BoardEntity }, tasks: { required: true, type: () => [require("../../tasks/entities/task.entity").TaskEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.BoardColumnEntity = BoardColumnEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BoardColumnEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BoardColumnEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BoardColumnEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], BoardColumnEntity.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.BoardEntity, (board) => board.columns, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'boardId' }),
    __metadata("design:type", board_entity_1.BoardEntity)
], BoardColumnEntity.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.TaskEntity, (task) => task.column, { cascade: true }),
    __metadata("design:type", Array)
], BoardColumnEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BoardColumnEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BoardColumnEntity.prototype, "updatedAt", void 0);
exports.BoardColumnEntity = BoardColumnEntity = __decorate([
    (0, typeorm_1.Entity)('board_columns'),
    (0, typeorm_1.Unique)(['board', 'position'])
], BoardColumnEntity);
//# sourceMappingURL=board-column.entity.js.map