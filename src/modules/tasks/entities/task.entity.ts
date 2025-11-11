import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../../modules/users/entities/user.entity";
import { BoardColumnEntity } from "../../../modules/boards/entities/board-column.entity";
import { BoardEntity } from "../../../modules/boards/entities/board.entity";
import { TaskPriority } from "../../../common/enums/task-priority.enum";
import { TaskStatus } from "../../../common/enums/task-status.enum";
import { CommentEntity } from "../../../modules/comments/entities/comment.entity";

@Entity('tasks')
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => BoardEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'boardId' })
    board: BoardEntity;

    @ManyToOne(() => BoardColumnEntity, (column) => column.tasks, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'columnId' })
    column: BoardColumnEntity;

    @ManyToOne(() => UserEntity, (user) => user.assignedTasks, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: 'assignedToUserId' })
    assignedTo: UserEntity | null;

    @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.LOW })
    priority: TaskPriority;

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN })
    status: TaskStatus;

    @Column({ type: 'timestamp', nullable: true })
    dueDate: Date | null;

    @ManyToOne(() => TaskEntity, (task) => task.subTasks, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: 'parentTaskId' })
    parentTask: TaskEntity | null;

    @OneToMany(() => TaskEntity, (task) => task.parentTask)
    subTasks: TaskEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.task, { cascade: true })
    comments: CommentEntity[];

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
