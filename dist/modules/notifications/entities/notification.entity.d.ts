import { UserEntity } from "../../../modules/users/entities/user.entity";
import { NotificationType } from "../../../common/enums/notification.enum";
export declare class NotificationEntity {
    id: number;
    message: string;
    type: NotificationType;
    isRead: boolean;
    readAt: Date | null;
    link: string;
    user: UserEntity;
    createdAt: Date;
    updatedAt: Date;
}
