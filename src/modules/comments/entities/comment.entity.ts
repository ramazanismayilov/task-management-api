import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @ManyToOne(() => CommentEntity, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'parentCommentId' })
    parentComment: CommentEntity | null;

    @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
    replies: CommentEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
