import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WorkspaceEntity } from "../../../modules/workspaces/entities/workspace.entity";
import { BoardEntity } from "../../../modules/boards/entities/board.entity";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
