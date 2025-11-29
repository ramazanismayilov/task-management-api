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
exports.TaskEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../modules/users/entities/user.entity");
const board_column_entity_1 = require("../../../modules/boards/entities/board-column.entity");
const board_entity_1 = require("../../../modules/boards/entities/board.entity");
const task_priority_enum_1 = require("../../../common/enums/task-priority.enum");
const task_status_enum_1 = require("../../../common/enums/task-status.enum");
const comment_entity_1 = require("../../../modules/comments/entities/comment.entity");
let TaskEntity = class TaskEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, board: { required: true, type: () => require("../../boards/entities/board.entity").BoardEntity }, column: { required: true, type: () => require("../../boards/entities/board-column.entity").BoardColumnEntity }, assignedTo: { required: true, type: () => require("../../users/entities/user.entity").UserEntity, nullable: true }, priority: { required: true, enum: require("../../../common/enums/task-priority.enum").TaskPriority }, status: { required: true, enum: require("../../../common/enums/task-status.enum").TaskStatus }, dueDate: { required: true, type: () => Date, nullable: true }, parentTask: { required: true, type: () => require("./task.entity").TaskEntity, nullable: true }, subTasks: { required: true, type: () => [require("./task.entity").TaskEntity] }, comments: { required: true, type: () => [require("../../comments/entities/comment.entity").CommentEntity] }, isArchived: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.TaskEntity = TaskEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TaskEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.BoardEntity, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'boardId' }),
    __metadata("design:type", board_entity_1.BoardEntity)
], TaskEntity.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_column_entity_1.BoardColumnEntity, (column) => column.tasks, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'columnId' }),
    __metadata("design:type", board_column_entity_1.BoardColumnEntity)
], TaskEntity.prototype, "column", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.assignedTasks, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedToUserId' }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: task_priority_enum_1.TaskPriority, default: task_priority_enum_1.TaskPriority.LOW }),
    __metadata("design:type", String)
], TaskEntity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: task_status_enum_1.TaskStatus, default: task_status_enum_1.TaskStatus.OPEN }),
    __metadata("design:type", String)
], TaskEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TaskEntity, (task) => task.subTasks, { onDelete: "CASCADE", nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentTaskId' }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "parentTask", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TaskEntity, (task) => task.parentTask),
    __metadata("design:type", Array)
], TaskEntity.prototype, "subTasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (comment) => comment.task, { cascade: true }),
    __metadata("design:type", Array)
], TaskEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], TaskEntity.prototype, "isArchived", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TaskEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TaskEntity.prototype, "updatedAt", void 0);
exports.TaskEntity = TaskEntity = __decorate([
    (0, typeorm_1.Entity)('tasks')
], TaskEntity);
//# sourceMappingURL=task.entity.js.map