import { ProjectEntity } from "src/modules/projects/entities/project.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BoardColumnEntity } from "./board-column.entity";

@Entity('boards')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => ProjectEntity, (project) => project.boards, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'projectId' })
    project: ProjectEntity;

    @OneToMany(() => BoardColumnEntity, (column) => column.board, { cascade: true })
    columns: BoardColumnEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
