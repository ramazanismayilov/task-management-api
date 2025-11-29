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
exports.CommentEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../../../modules/tasks/entities/task.entity");
const user_entity_1 = require("../../../modules/users/entities/user.entity");
let CommentEntity = class CommentEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, content: { required: true, type: () => String }, description: { required: true, type: () => String }, task: { required: true, type: () => require("../../tasks/entities/task.entity").TaskEntity }, user: { required: true, type: () => require("../../users/entities/user.entity").UserEntity }, parentComment: { required: true, type: () => require("./comment.entity").CommentEntity, nullable: true }, replies: { required: true, type: () => [require("./comment.entity").CommentEntity] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.CommentEntity = CommentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommentEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CommentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.TaskEntity, (task) => task.comments, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "taskId" }),
    __metadata("design:type", task_entity_1.TaskEntity)
], CommentEntity.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.comments, { onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_entity_1.UserEntity)
], CommentEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CommentEntity, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'parentCommentId' }),
    __metadata("design:type", Object)
], CommentEntity.prototype, "parentComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CommentEntity, (comment) => comment.parentComment),
    __metadata("design:type", Array)
], CommentEntity.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CommentEntity.prototype, "updatedAt", void 0);
exports.CommentEntity = CommentEntity = __decorate([
    (0, typeorm_1.Entity)("comments")
], CommentEntity);
//# sourceMappingURL=comment.entity.js.map