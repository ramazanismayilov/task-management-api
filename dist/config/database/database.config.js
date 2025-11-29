"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const path_1 = require("path");
const task_entity_1 = require("../../modules/tasks/entities/task.entity");
const user_entity_1 = require("../../modules/users/entities/user.entity");
const role_entity_1 = require("../../modules/roles/entities/role.entity");
const board_entity_1 = require("../../modules/boards/entities/board.entity");
const profile_entity_1 = require("../../modules/profiles/entities/profile.entity");
const project_entity_1 = require("../../modules/projects/entities/project.entity");
const comment_entity_1 = require("../../modules/comments/entities/comment.entity");
const workspace_entity_1 = require("../../modules/workspaces/entities/workspace.entity");
const board_column_entity_1 = require("../../modules/boards/entities/board-column.entity");
const attachment_entity_1 = require("../../modules/attachments/entity/attachment.entity");
const notification_entity_1 = require("../../modules/notifications/entities/notification.entity");
const workspace_type_entity_1 = require("../../modules/workspaces/entities/workspace-type.entity");
const organization_entity_1 = require("../../modules/organizations/entities/organization.entity");
const project_member_entity_1 = require("../../modules/projects/entities/project_member.entity");
const users_1 = require("../../modules/users");
const audit_entity_1 = require("../../core/audit/entities/audit.entity");
const databaseConfig = async (configService) => {
    return {
        type: 'postgres',
        host: configService.get('SUPABASE_HOST'),
        port: configService.get('SUPABASE_PORT'),
        username: configService.get('SUPABASE_USER'),
        password: configService.get('SUPABASE_PASSWORD'),
        database: configService.get('SUPABASE_DB'),
        entities: [
            user_entity_1.UserEntity, users_1.UserActivationEntity, role_entity_1.RoleEntity, profile_entity_1.ProfileEntity, task_entity_1.TaskEntity, comment_entity_1.CommentEntity,
            notification_entity_1.NotificationEntity, attachment_entity_1.AttachmentEntity, board_entity_1.BoardEntity, board_column_entity_1.BoardColumnEntity,
            project_entity_1.ProjectEntity, project_member_entity_1.ProjectMemberEntity, workspace_entity_1.WorkspaceEntity, workspace_type_entity_1.WorkspaceTypeEntity, organization_entity_1.OrganizationEntity, audit_entity_1.AuditEntity
        ],
        migrations: [(0, path_1.join)(__dirname, '../migrations/*.{ts,js}')],
        synchronize: true,
        logging: true,
    };
};
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map