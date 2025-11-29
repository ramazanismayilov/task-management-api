import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskEntity } from '../../modules/tasks/entities/task.entity';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { RoleEntity } from '../../modules/roles/entities/role.entity';
import { BoardEntity } from '../../modules/boards/entities/board.entity';
import { ProfileEntity } from '../../modules/profiles/entities/profile.entity';
import { ProjectEntity } from '../../modules/projects/entities/project.entity';
import { CommentEntity } from '../../modules/comments/entities/comment.entity';
import { WorkspaceEntity } from '../../modules/workspaces/entities/workspace.entity';
import { BoardColumnEntity } from '../../modules/boards/entities/board-column.entity';
import { AttachmentEntity } from '../../modules/attachments/entity/attachment.entity';
import { NotificationEntity } from '../../modules/notifications/entities/notification.entity';
import { WorkspaceTypeEntity } from '../../modules/workspaces/entities/workspace-type.entity';
import { OrganizationEntity } from '../../modules/organizations/entities/organization.entity';
import { ProjectMemberEntity } from '../../modules/projects/entities/project_member.entity';
import { UserActivationEntity } from 'src/modules/users';
import { AuditEntity } from 'src/core/audit/entities/audit.entity';

export const databaseConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
        type: 'postgres',
        host: configService.get('SUPABASE_HOST'),
        port: configService.get<number>('SUPABASE_PORT'),
        username: configService.get('SUPABASE_USER'),
        password: configService.get('SUPABASE_PASSWORD'),
        database: configService.get('SUPABASE_DB'),
        entities: [
            UserEntity, UserActivationEntity, RoleEntity, ProfileEntity, TaskEntity, CommentEntity,
            NotificationEntity, AttachmentEntity, BoardEntity, BoardColumnEntity,
            ProjectEntity, ProjectMemberEntity, WorkspaceEntity, WorkspaceTypeEntity, OrganizationEntity, AuditEntity
        ],
        migrations: [join(__dirname, '../migrations/*.{ts,js}')],
        synchronize: true,
        logging: true,
    };
};
