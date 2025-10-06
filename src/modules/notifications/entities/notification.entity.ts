import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../../modules/users/entities/user.entity";
import { NotificationType } from "../../../common/enums/notification.enum";

@Entity('notifications')
export class NotificationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column({ type: 'enum', enum: NotificationType, default: NotificationType.INFO })
    type: NotificationType;

    @Column({ default: false })
    isRead: boolean;

    @ManyToOne(() => UserEntity, (user) => user.notifications, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
