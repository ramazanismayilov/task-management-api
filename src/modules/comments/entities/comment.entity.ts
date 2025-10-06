import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskEntity } from "../../../modules/tasks/entities/task.entity";
import { UserEntity } from "../../../modules/users/entities/user.entity";

@Entity("comments")
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => TaskEntity, (task) => task.comments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "taskId" })
    task: TaskEntity;

    @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: "SET NULL" })
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
