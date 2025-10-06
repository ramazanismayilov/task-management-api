import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BoardEntity } from "./board.entity";
import { TaskEntity } from "../../../modules/tasks/entities/task.entity";

@Entity('board_columns')
export class BoardColumnEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'int' })
    position: number;

    @ManyToOne(() => BoardEntity, (board) => board.columns, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'boardId' })
    board: BoardEntity;

    @OneToMany(() => TaskEntity, (task) => task.column, { cascade: true })
    tasks: TaskEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
