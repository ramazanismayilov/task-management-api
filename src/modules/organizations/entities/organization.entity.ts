import { AttachmentEntity } from "../../../modules/attachments/entity/attachment.entity";
import { WorkspaceEntity } from "../../../modules/workspaces/entities/workspace.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('organizations')
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToOne(() => AttachmentEntity, { eager: true, nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: 'logoId' })
    logo: AttachmentEntity | null;

    @OneToMany(() => WorkspaceEntity, (workspace) => workspace.organization)
    workspaces: WorkspaceEntity[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    domain: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    updatedAt: Date;
}