import { AttachmentEntity } from "src/modules/attachments/entity/attachment.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('profile')
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    fullName: string

    @Column({ nullable: true })
    bio: string

    @OneToOne(() => AttachmentEntity, { eager: true, nullable: true })
    @JoinColumn({ name: 'avatarId' })
    avatar: AttachmentEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}