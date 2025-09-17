import { AttachmentEntity } from "src/modules/attachments/entity/attachment.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('profiles')
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    fullName: string

    @Column({ nullable: true })
    bio: string

    @OneToOne(() => AttachmentEntity, { eager: true, nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: 'avatarId' })
    avatar: AttachmentEntity;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;
}