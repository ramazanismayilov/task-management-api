import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WorkspaceEntity } from "../../../modules/workspaces/entities/workspace.entity";
import { BoardEntity } from "../../../modules/boards/entities/board.entity";
import { ProjectMemberEntity } from "./project_member.entity";

@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.projects, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'workspaceId' })
    workspace: WorkspaceEntity;

    @OneToMany(() => BoardEntity, (board) => board.project)
    boards: BoardEntity[];

    @OneToMany(() => ProjectMemberEntity, member => member.project, { cascade: true })
    members: ProjectMemberEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
