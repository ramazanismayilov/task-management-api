import { CommentEntity } from "src/modules/comments/entities/comment.entity";
import { NotificationEntity } from "src/modules/notifications/entities/notification.entity";
import { ProfileEntity } from "src/modules/profiles/entities/profile.entity";
import { RoleEntity } from "src/modules/roles/entities/role.entity";
import { TaskEntity } from "src/modules/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'SET NULL', eager: true })
    role: RoleEntity;

    @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
    profile: ProfileEntity;

    @Column({ default: false })
    isActive: boolean

    @Column({ type: 'int', nullable: true })
    otpCode?: number | null;

    @Column({ type: 'timestamp', nullable: true })
    otpExpiredAt?: Date | null;

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string | null;

    @Column({ type: 'timestamp', nullable: true })
    refreshTokenDate: Date | null;

    @OneToMany(() => TaskEntity, (task) => task.assignedTo)
    assignedTasks: TaskEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[];

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;
}