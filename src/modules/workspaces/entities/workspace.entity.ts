import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WorkspaceTypeEntity } from "./workspace-type.entity";
import { OrganizationEntity } from "src/modules/organizations/entities/organization.entity";
import { ProjectEntity } from "src/modules/projects/entities/project.entity";

@Entity('workspaces')
export class WorkspaceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => WorkspaceTypeEntity, (type) => type.workspaces, { eager: true, onDelete: "SET NULL" })
    @JoinColumn({ name: 'typeId' })
    type: WorkspaceTypeEntity;

    @OneToMany(() => ProjectEntity, (column) => column.workspace, { cascade: true })
    projects: ProjectEntity[];

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => OrganizationEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'organizationId' })
    organization: OrganizationEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
