import { CommentEntity } from "../../../modules/comments/entities/comment.entity";
import { NotificationEntity } from "../../../modules/notifications/entities/notification.entity";
import { ProfileEntity } from "../../../modules/profiles/entities/profile.entity";
import { RoleEntity } from "../../../modules/roles/entities/role.entity";
import { TaskEntity } from "../../../modules/tasks/entities/task.entity";
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    role: RoleEntity;
    profile: ProfileEntity;
    isActive: boolean;
    otpCode?: number | null;
    otpExpiredAt?: Date | null;
    refreshToken: string | null;
    refreshTokenDate: Date | null;
    assignedTasks: TaskEntity[];
    comments: CommentEntity[];
    notifications: NotificationEntity[];
    createdAt: Date;
    updatedAt: Date;
}
